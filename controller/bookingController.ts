import { catchAsync } from "../errorhandler/catchAsync";
import { NextFunction, Request, Response } from "express";
import { prisma } from '../prisma/client';
import AppError from "../errorhandler/appError";

export const reserve=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
     // 1.check if spot is available(totalspace - booked)
     // 2.check if booking time is between opening and closing time(operational time)
     //3.then reserve if available
    
    //  get userId ,providerId,startTime and endTime from request body
     const{userId,providerId,startTime,endTime}=req.body
    //  check if user is exist
    const user=await prisma.user.findUnique({where:{id:userId}})
    // if the user is not found ,send error message
    if(!user){
        return next(new AppError('user is not found',400))
    }
    //find the provider if exist
    const provider=await prisma.parkingProvider.findUnique({where:{id:providerId},include:{book:true}})
    // if the provider is not found,send error message
    if(!provider){
        return next(new AppError('provider is not found',400))
    }
      // calculate available spot
     const reservedParkingSpot=provider.book.length
     const availableSpot=provider.totalSpace - reservedParkingSpot
     
      // if no available spots
      if(availableSpot <= 0){
      return next(new AppError('sorry,there is no available parking spot',404))
     } 
    //  compare start time and end time with opening and closing time
     let sTime=new Date(startTime)
     let eTime=new Date(endTime)
    //  sTime=sTime.split('T')[1]
    //  eTime=eTime.split('T')[1]
    //  console.log('start time:',sTime,typeof sTime)
    //  console.log('end time:',eTime,typeof eTime)
   
    //  console.log('openingtime:',new Date(provider.openingTime))
    //  console.log('closing time:',new Date(provider.closingTime))

    //  console.log(sTime < new Date(provider.openingTime))
    //  console.log(eTime > new Date(provider.closingTime))
     
     
    

    // check if reservation time is between operational time
      if( sTime < new Date(provider.openingTime) || eTime > new Date(provider.closingTime )){
        return next(new AppError('No parking provider is available during the selected time,please choose other time',400))
      }
   
    // check for available spot
    const existingReservation = await prisma.booking.findFirst({
      where: {
        providerId,
        startTime,
        endTime   
      },
      include:{
        provider:true
      }
    });
    // if the parking spot already reserved ,send a message
    if(existingReservation){
      return next(new AppError('This parking space is already  reserved,please choose other time',400))
    }

     
    //create new booking 
    const newBooking = await prisma.booking.create({
      data: { ...req.body, 
        startTime:sTime,
        endTime:eTime
      },
    });


  //  send response
    res.status(201).json({
        status: "success",  
        message: "parking spot is reserved",
        newBooking
      });


})



//GET ALL BOOKING
export const getAllBookingsForProvider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { providerId } = req.params;
    // pagnation
    const page = parseInt(req.query.page as string) || 10
    const limit = parseInt( req.query.limit as string ) || 20
    const skip:number = (page - 1)* limit
    const provider = await prisma.parkingProvider.findUnique({
      
      where: { id: providerId },
      select:{
        book:{
          skip,
          take:page
        }
        
      },
    });
    // if the provider is not found,send error message
    if (!provider) {
      return next(new AppError("provider is not found", 400));
    }
    //
    const booking=provider.book
    // send response
    res.status(200).json({
      status: "success",  
      result: booking.length,
      booking
    });

  }
);