import IAuthUser from './models/IAuthUser';
import {sign, verify} from 'jsonwebtoken';
import {compareSync, hashSync} from 'bcryptjs';
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

    static verifyJWT(token : string, callback : any){
        verify(token, process.env.JWT_SECRET_KEY, callback);
    }
}