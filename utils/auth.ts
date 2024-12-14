import jwt, { Secret } from 'jsonwebtoken'
import { S } from 'vite/dist/node/types.d-aGj9QkWt';

export const signToken = (payload:{id:string,role?:string})=> {
  const {
    id,
    role,
  }=payload
  
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as Secret;
  const EXPIRES_IN = process.env.EXPIRES_IN;
  return jwt.sign(payload ,JWT_SECRET_KEY, { expiresIn: EXPIRES_IN });
};