import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import { v4 as uuidv4 } from 'uuid';

export const create=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
const{userId,providerId,hourlyRate}=req.body
const rateId=uuidv4()
const provider=await prisma.parkingProvider.findFirst({where:{
    id:providerId
   
}, include:{
    rate:true
}

})
const rate=await prisma.rate.create({
    data:{
    id:rateId,
    providerId,
    userId,
    hourlyRate:parseFloat(hourlyRate)
}})

res.status(201).json({
    status: "success",
    message: "rate added succssfully",
    rate,
  });
}
);

