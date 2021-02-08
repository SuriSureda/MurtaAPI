import {hashSync, compareSync} from 'bcryptjs';

export default class Auth{

    private static  salt_number : number = 10;

    static hashPassword(password : string) : string{
        return hashSync(password,this.salt_number);
    }

    static comparePassword(password : string, encrypted : string) : boolean{
        return compareSync(password, encrypted);
    }
}