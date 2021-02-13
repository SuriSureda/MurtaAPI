import IUser from "./IUser";

export default interface ICreatedUser {
    _id : IUser['_id'],
    user_name : IUser['user_name'],
    email : IUser['email']
}