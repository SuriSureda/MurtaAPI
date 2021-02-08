import IService from "./IService";
import Register from '../models/schemas/RegisterSchema';
import IRegister from "../models/IRegister";

export default class RegisterService implements IService{

    create(params: IRegister, callback: any) {
        let _session = new Register(params);
        _session.save(callback);
    }

    get(id: string, callback: any) {
        Register.findById(id, {deleted : false},callback);
    }

    getByUser(user_id : string, callback : any){
        Register.find({user : user_id, deleted : false},callback);
    }

    getAll(callback : any){
        Register.find(callback);
    }

    update(params: IRegister, callback: any) {
        Register.findByIdAndUpdate(params._id,params,callback);
    }

    remove(_id: string, callback: any) {
        Register.findByIdAndRemove(_id,callback);
    }
    
}