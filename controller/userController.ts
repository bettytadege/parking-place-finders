import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import AppError from "../errorhandler/appError";
import { signToken } from "../utils/auth";
import bcrypt from "bcryptjs";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("exising user", existingUser);

    if (existingUser) {
      return next(new AppError("User already exists with this email", 400));
    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 12);
    console.log("password", hashPassword);
    //create user if not exist
    const newUser = await prisma.user.create({
      data:
      { ...req.body,
      password:hashPassword,}
    });
    //generate token
    const token = signToken({ id: newUser.id, role: newUser.role });
    res.status(200).json({
      status: "success",
      message: "user registered succssfully",
      token,
      newUser,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select:{
        password:true
      }
    });
    console.log("user", user);


    if (!user) {
      return next(new AppError("User is not found", 400));
    }

    // const token = signToken({ id: user.id, role: user.role });
    res.status(200).json({
      status: "success",
      message: "user logged succssfully",
    //   token,
    });
  }
);
