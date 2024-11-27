import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import AppError from "../errorhandler/appError";
import { signToken } from "../utils/auth";
import bcrypt, { compare } from "bcryptjs";



export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if user exist send error message
    if (existingUser) {
      return next(new AppError("User already exists with this email", 400));
    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 12);
    //create user if not exist
    const newUser = await prisma.user.create({
      data:
      { ...req.body,
      password:hashPassword,}
    });
    //generate token
    const token = signToken({ id: newUser.id, role: newUser.role });
    // send response
    res.status(201).json({
      status: "success",
      message: "user registered succssfully",
      token,
      newUser,
    });
  }
);

export const login = catchAsync(

  async (req: Request, res: Response, next: NextFunction) => {
    // get email and password from request body
    const { email, password } = req.body;

    if(!email || !password){
        return next(new AppError("please provide email and password", 400));
    }
    //find a user by email and select
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // if user is not found in db send error message
    if (!user) {
      return next(new AppError("User is not found", 400));
    }
    // compare input password and hashed password
    if(!( await compare(password,user.password))){
        return next(new AppError("incorrect password ,please try again!", 400));
    }
    // generate token
    const token = signToken({ id: user.id, role: user.role });
    // send response
    res.status(200).json({
      status: "success",
      message: "user logged succssfully",
      token,
    });
  }
);


export const getOneUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    // 
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    // if user is not found in db send error message
    if (!user) {
        return next(new AppError("User is not found", 400));
      }
    res.status(200).json({
        status: "success",
        user,
      });
    
})

export const getAllUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    // 
    const filter={}
    const user = await prisma.user.findMany()
    res.status(200).json({
        status: "success",
        message: "user logged succssfully",
        result:user.length,
        user,
      });
    
})