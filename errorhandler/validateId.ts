import { NextFunction, Request, Response } from 'express';
import { validate as isUuid } from 'uuid';

const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const idFields=Object.keys(req.body).filter(id=> id.includes('Id'))

  console.log('id::', idFields); 

  
  for ( const field of idFields) {
    const value = req.body[field];
    console.log('val:',value)
    if (value && !isUuid(value)) {
       res.status(400).json({
        error: `Invalid UUID in field: ${field}`,
      });
    }
  }
  next();
};

export default validateId;
