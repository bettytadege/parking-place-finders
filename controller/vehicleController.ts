import { getAllUser } from './userController';
import { NextFunction, Request, Response } from "express";
import AppError from "../errorhandler/appError";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";


//REGISTER VEHICLE
export const register = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
    const{userId}=req.body

    if(!userId){
        return next(new AppError("please provide user id", 400));
    }
    const user=await prisma.user.findUnique({where:
        {
        id:parseInt(userId)
    },})
    console.log(user)
    if(!userId){
        return next(new AppError("please provide user id", 400));
    }
    if(!user){
        return next(new AppError("user not found", 400));
    }
     //create vehicle
      const vehicle = await prisma.vehicle.create({
        data: { ...req.body, userId: user.id },
      });
      console.log(vehicle)
      // send response
      res.status(201).json({
        status: "success",
        message: "vehicle registered succssfully",
        vehicle
      });
    }
  );

  // GET ALL VEHICLES
  export const getAllVehicle = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {

        const filter={}
        const vehicle = await prisma.vehicle.findMany()
        res.status(200).json({
            status: "success",
            result:vehicle.length,
            vehicle,
          });
    }
  );

  //UPDATE VEHICLE
  export const updateVehicle = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(id)},
      });
      if (!vehicle) {
        return next(new AppError("no vehicle found with this id", 400));
      }
    //   console.log(vehicle)
     const updatedVehicle= await prisma.vehicle.update({ where:{ id: parseInt(id) },data:{
        ...req.body,
     } });
      res.status(200).json({
        status: "success",
        message: "vehicle updated sucessfully",
        updatedVehicle
      });
    }
  );

  //DELETE VEHICLE
  export const deleteVehicle = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: parseInt(id) },
      });
      if (!vehicle) {
        return next(new AppError("no vehicle found with this id", 400));
      }
      await prisma.vehicle.delete({ where: { id: parseInt(id) } });
      res.status(200).json({
        status: "success",
        message: "vehicle deleted sucessfully",
      });
    }
  );