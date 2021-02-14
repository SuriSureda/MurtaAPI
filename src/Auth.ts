import IAuthUser from './models/IAuthUser';
import {sign} from 'jsonwebtoken';
import {compareSync, hashSync} from 'bcryptjs'

export default class Auth{


    private static  salt_number : number = 10;

    static hashPassword(password : string) : string{
        return hashSync(password,this.salt_number);
    }

    static comparePassword(password : string, encrypted : string) : boolean{
        return compareSync(password, encrypted);
    }

    static getJWT(payload : IAuthUser) : string{
        return sign(payload, process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
    }
}