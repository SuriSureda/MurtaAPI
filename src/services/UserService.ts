import IService from "./IService";
import User from '../models/schemas/UserSchema';
import IUser from "../models/IUser";
import EmailValidator from "../validator/EmailValidator";

export default class UserService implements IService{

    create(params: IUser, callback: any) {
        let _session = new User(params);
        _session.save(callback);
    }

    get(id: string, callback: any) {
        User.findById(id, {deleted : false},callback);
    }

    getSignIn(email : string, callback : any){
        User.findOne({ email : email, deleted : false}, callback).select("+password");
    }

    // gets users with password
    getWPassword(id: string, callback: any) {
        User.findById(id,{deleted : false},callback).select("+password");
    }

    getAll(callback : any){
        User.find({deleted : false},callback);
    }

    update(params: IUser, callback: any) {
        User.findByIdAndUpdate(params._id,params,callback);
    }

    remove(_id: string, callback: any) {
        User.findByIdAndRemove(_id,callback);
    }
    
}