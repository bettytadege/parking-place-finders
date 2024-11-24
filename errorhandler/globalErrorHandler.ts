import { NextFunction ,Request,Response} from "express";

const globalErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
    // console.error('Error 💥:', err);
  
    const statusCode:number = err.statusCode || 500;
    const status:string = err.status || 'error';
  
    res.status(statusCode).json({
      status,
      message: err.message || 'Something went wrong!',
    });
  };
  
  export default  globalErrorHandler;
  