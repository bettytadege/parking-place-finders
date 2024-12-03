import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import AppError from "../errorhandler/appError";
import { signToken } from "../utils/auth";
import bcrypt, { compare } from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';


//REGISTER USER
export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body;
    const userId=uuidv4()
    console.log('id:',userId,typeof userId)
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(existingUser)
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
        id:userId,
      password:hashPassword,}
    });
    // console.log("newuse::",newUser)
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

//LOGIN
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
    // console.log(user)

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

//GET USER BY ID
export const getOneUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    // 
    const { id } = req.params;
    console.log(id,typeof id)
    const user = await prisma.user.findUnique({
      where: {
        id:id
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

//GET ALL USER
export const getAllUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    // 
    const filter={}
    const user = await prisma.user.findMany()
    res.status(200).json({
        status: "success",
        result:user.length,
        user,
      });
    
})


