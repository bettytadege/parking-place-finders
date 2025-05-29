import { NextFunction, Request, Response } from "express";
import AppError from "../errorhandler/appError";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/auth";
import{v4 as uuidv4 } from "uuid"

// REGISTER PARKING PROVIDER
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const providerId=uuidv4()
    //get email and admin id from request body
    const { email, adminId } = req.body;
    // Check if admin exists
    const admin = await prisma.user.findUnique({
      where: { id:adminId },
    });
    // if admin is not exist return error
    if (!admin) {
      return next(new AppError("No admin account found", 404));
    }
    // Check if provider already exists
    const provider = await prisma.parkingProvider.findUnique({
      where: { email }, 
    });
   // if provider found send error message 
    if (provider) {
      return next(new AppError("Provider already exists", 400));
    }
    // console.log("provider:",provider)
    // Create a new provider
    const newProvider = await prisma.parkingProvider.create({
      data: {
        ...req.body,
        id:providerId,
        adminId:admin.id,
        totalSpace:parseInt(req.body.totalSpace),//parse to integer
      },
    });
    // console.log('new provider:',newProvider)
    // Generate token
    // const token = signToken({ id: newProvider.id });
    
    // Send response
    res.status(201).json({
      status: "success",
      message: "Provider registered successfully",
      // token,
      newProvider,
    });
  }
);



export const getAllProvider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // filtering, pagnation
    const page = parseInt(req.query.page as string) || 10
    const limit = parseInt( req.query.limit as string ) || 20
    const skip:number = (page - 1)* limit
    
    // find all provider
    const provider = await prisma.parkingProvider.findMany(
      {
        orderBy:{
          createdAt:'asc'
        },
        skip:skip,
        take:page
      }
    );
    res.status(200).json({
      status: "success",
      result: provider.length,
      provider,
    });
  }
);

export const getProviderProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params;
    const provider = await prisma.parkingProvider.findUnique({
      where: {
        id 
      },
    });

    // if provider is not found  send error message
    if (!provider) {
      return next(new AppError("provider is not found", 400));
    }

    //send response
    res.status(200).json({
      status: "success",
      provider,
    });
  }
);

export const updateProvider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    //find provider using provider id
      const provider = await prisma.parkingProvider.findUnique({
        where: { id},
      });
      // if provider is not found
      if (!provider) {
        return next(new AppError("no provider found with this id", 400));
      }
     //update provider
     const updatedProvider= await prisma.parkingProvider.update({ where:{ id},data:{
        ...req.body,
        adminId: req.body.adminId , 
        totalSpace: req.body.totalSpace ? parseInt(req.body.totalSpace) : undefined,
        availableSpace: req.body.availableSpace ? parseInt(req.body.availableSpace) : undefined,
     } });
     //send reponse
      res.status(200).json({
        status: "success",
        message: "provider updated sucessfully",
        updatedProvider
      });
  }
);

export const Search = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name ,address } = req.query;
    if(!name || !address){
      return next(new AppError("name or address required ", 404)); 
    }
    //find provider using provider id
      const provider = await prisma.parkingProvider.findMany({
        where: {
          name:name as string,
          // address

        },
      });
      // if provider is not found
      if (!provider) {
        return next(new AppError("provider not found ", 404));
      }
     //update provider

     //send reponse
      res.status(200).json({
        status: "success",
        provider
      });
  }
);