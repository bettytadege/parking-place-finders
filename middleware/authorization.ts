import { NextFunction, Request, Response } from "express";

export const protect=(req: Request, res: Response, next: NextFunction)=>{

    console.log(req.headers)
    console.log(req.headers.authorization)
    let token=req.headers.authorization?.startsWith('Bearer') &&req.headers.authorization?.split('Bearer')[1] 
    // token=token.split("Bearer").[1]

}