
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../errorhandler/catchAsync";
import { prisma } from "../prisma/client";
import AppError from "../errorhandler/appError";
import { signToken } from "../utils/auth";
import admin  from "../firebase/admin";


//REGISTER USER
// export const register = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { email, password,role} = req.body;
//     if(!email || !password){
//       return next(new AppError("please provide email and password", 400));
//     }
//     const userId=uuidv4()
//     // console.log('id:',userId,typeof userId)
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     console.log('existing user ',existingUser)
//     // if user exist send  message
//     if (existingUser) {
//       return next(new AppError("User already exists with this email", 400));
//     }
//     // hashing password
//     // const hashPassword = await bcrypt.hash(password, 12);
//     // console.log(hashPassword)
//     //create user if not exist
//     // const userRecord=await admin.auth().createUser({
//     //   email,
//     //   password,
    
//     // })
//   // console.log('user record:',userRecord)
//     // console.log('token:',token)
//     const newUser = await prisma.user.create({
//       data:
//       { 
//         ...req.body,
//         // firebaseUid:userRecord.uid,
//         id:userId,
//       // password:hashPassword,
//     }
//     });
//     console.log("newuser::",newUser)
   
//     // send response
//     res.status(201).json({
//       status: "success",
//       message: "user registered succssfully",
//       newUser,
//     });
//   }
// );

//signin
export const signIn = catchAsync(

  async (req: Request, res: Response, next: NextFunction) => {
    let idToken=req.headers.authorization?.split(' ')[1] as string
    console.log('idToken:',idToken)
  
    const decodeToken= await admin.auth().verifyIdToken(idToken)
    console.log('decode token:',decodeToken)
    const{uid,picture,name,email }=decodeToken
    
    let user = await prisma.user.findUnique({
      where: {
        firebaseUid:uid,
      },
    });
    
    console.log('user',user)
    if(!user){
     user=await prisma.user.create({
      data:{
        firebaseUid:uid,
        name:name,
        email:email as string ,
        profileImage:picture as string,
        role:"user"

      }
     })

    }
    //generate jwt token for future authentication
    const token = signToken({ id: user.id, role: user.role });
    console.log('token--',token)

    res.status(200).json({
      status: "success",
      message: "user logged succssfully",
      token,
    });
   
  }
);

//GET USER BY ID
export const getUserProfile=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
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


