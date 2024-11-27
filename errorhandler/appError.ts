class AppError extends Error {
    //define their type 
    public statusCode:number
    public status:string
    public isOperational:Boolean

    
    constructor(message:string,statusCode:number) {
        console.log('message:', message);
        console.log('statusCode:', statusCode);
        super(message); 
        this.statusCode = statusCode; 
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
