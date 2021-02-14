import IAuthUser from './models/IAuthUser';
import {sign, verify} from 'jsonwebtoken';
import {compareSync, hashSync} from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import CustomResponse from './CustomResponse';
export default class Auth{


    private static  salt_number : number = 10;

    static hashPassword(password : string) : string{
        return hashSync(password,this.salt_number);
    }

    static comparePassword(password : string, encrypted : string) : boolean{
        return compareSync(password, encrypted);
    }

    static getJWT(payload : IAuthUser, callback : any){
        sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : "1d"}, callback);
    }


    //Ass Middleware
    static verifyJWT(req : Request, res : Response, next : NextFunction){

        if(req.headers.authorization){
            verify(req.headers.authorization, process.env.JWT_SECRET_KEY, (err : any, token : object) => {
                if(err){
                    CustomResponse.forbiddenResponse(res);
                }else{
                    next();
                }
            });
        }else{
            CustomResponse.unauthResponse(res);
        }
    }
}