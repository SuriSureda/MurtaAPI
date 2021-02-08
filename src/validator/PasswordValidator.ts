export default class PasswordValidator{
    static isPassword( password: string) : boolean{
       return password.length >= 6;
    }
} 