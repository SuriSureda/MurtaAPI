import IService from "./IService";
import Register from '../models/schemas/RegisterSchema';
import IRegister from "../models/IRegister";

export default class RegisterService implements IService{

    create(params: IRegister, callback: any) {
        let _session = new Register(params);
        _session.save(callback);
    }

    getNumberRegisters( callback : any) {
        Register.countDocuments(callback);
    }

    get(id: string, callback: any) {
        Register.findById(id, {deleted : false},callback);
    }

    getByUser(user_id : string, callback : any){
        Register.find({user : user_id, deleted : false},callback);
    }

    // With populated user ( only username )
    getRange(first : number, limit : number, callback : any){
        Register.find({deleted : false},callback).sort({'date' : -1}).skip(first).limit(limit).populate('user', 'user_name');
    }

    // With populated user ( only username )
    getAll(callback : any){
        Register.find(callback).populate('user', 'user_name');
    }

    update(params: IRegister, callback: any) {
        Register.findByIdAndUpdate(params._id,params,callback);
    }

    remove(_id: string, callback: any) {
        Register.findByIdAndRemove(_id,callback);
    }
    
}