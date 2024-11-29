import { Address } from './../node_modules/.prisma/client/index.d';
import AppError from '../errorhandler/appError';
import { catchAsync } from '../errorhandler/catchAsync';
import { NextFunction, Request, Response } from "express";
import { prisma } from '../prisma/client';


export const register=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
 const{providerId}=req.body
 console.log('first')
 // Check if provider already exists
 const provider = await prisma.parkingProvider.findUnique({
    where: { id:parseInt(providerId) }, 
  });
  console.log(provider)
  if (!providerId) {
    return next(new AppError("Please provide provider id", 400));
  }
   // if provider not found send error message 
  if (!provider) {
    return next(new AppError("Provider not found", 400));
  }
    //add location 
  const address=await prisma.address.create({
    data:{...req.body,
        providerId:parseInt(req.body.providerId),
        longitude:parseFloat(req.body.longitude),
        latitude:parseFloat(req.body.latitude)
    }})//addis ababa, 123 bole street, 48.40 48.400
    // Send response,
    res.status(201).json({
        status: "success",
        message: "address registered successfully",
        address
      });


}
)