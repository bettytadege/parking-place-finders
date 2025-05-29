import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import AppError from "../errorhandler/appError";
import { v4 as uuidv4 } from "uuid";
export const checkout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookingId, providerId } = req.body;
    const paymentId = uuidv4();
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
      },
      include: {
        user: true,
        provider: {
          include: {
            rate: true,
          },
        },
      },
    });
     console.log('book',booking)
    // if there is no booking history
    if (!booking) {
      return next(
        new AppError("there is no booking history with this booking id", 400)
      );
    }
    // if the user is not found ,send error message
    if (!booking.user) {
      return next(new AppError("user is not found", 404));
    }
    //if provide is not found
    if (!booking.provider) {
      return next(new AppError("parking provider is not found", 404));
    }
    console.log(booking.startTime, typeof booking.startTime);
    //calculate duration
    let startTime = new Date(booking.startTime);
    let endTime = new Date(booking.endTime);
    // console.log(startTime, startTime.getTime());

    let durationTime =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); //convert into hour
    console.log("duration", durationTime);
    let hourlyRate = booking?.provider.rate[0].hourlyRate;
    console.log("hourly rate", hourlyRate);
    let totalAmonut = durationTime * hourlyRate;
    console.log(totalAmonut);
    await prisma.payment.create({
      data: {
        id: paymentId,
        providerId,
        userId,
        bookingId,
        amount: totalAmonut,
      },
    });

    res.status(201).json({
      status: "success",
      message: "your payment is completed",
    });
  }
);
