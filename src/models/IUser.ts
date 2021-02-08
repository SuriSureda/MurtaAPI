import IObject from "./IObject";

export default interface IUser extends IObject{
    user_name : string,
    email : string,
    password : string,
}