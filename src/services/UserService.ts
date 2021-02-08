import IService from "./IService";
import User from '../models/schemas/UserSchema';
import IUser from "../models/IUser";

export default class UserService implements IService{

    create(params: IUser, callback: any) {
        let _session = new User(params);
        _session.save(callback);
    }

    get(id: string, callback: any) {
        User.findById(id, {deleted : false},callback);
    }

    // gets users with password
    getWPassword(id: string, callback: any) {
        User.findById(id,{deleted : false},callback).select("+password");
    }

    getAll(callback : any){
        User.find(callback);
    }

    update(params: IUser, callback: any) {
        User.findByIdAndUpdate(params._id,params,callback);
    }

    remove(_id: string, callback: any) {
        User.findByIdAndRemove(_id,callback);
    }
    
}