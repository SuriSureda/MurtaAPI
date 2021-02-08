import {Application, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Auth from '../Auth';
import CustomResponse from '../CustomResponse'
import IRegister from '../models/IRegister';
import RegisterService from '../services/RegisterService';
import Controller from "./Controller";
import IController from "./IController";

export default class RegisterController extends Controller<RegisterService> implements IController{

    constructor(){
        let service = new RegisterService();
        super(service);
    }
    
    create(req: Request, res: Response): void {
        if(this.isCreateRegisterBody(req)){
            let register : IRegister = {
                date : new Date(Date.now()),
                user : req.body.user
            }
            this.service.create(register, (err : any, register_data : IRegister) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else{
                    CustomResponse.successResponse("register created",register_data, res);
                }
            })
        }else{
            CustomResponse.badRequest(res);
        }
    }
    // gets all registers with same user id
    get(req : Request, res: Response): void {
        if(req.params.user_id && isValidObjectId(req.params.user_id)){
            this.service.getByUser(req.params.user_id, (err : any, registers : IRegister[]) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else{
                    CustomResponse.successResponse("registers by user detected",registers,res);
                }
            })
        }else{
            CustomResponse.badRequest(res);
        }
    }

    getAll(req : Request, res: Response): void {
       
    }

    update(req: Request, res: Response): void {
       
    }

    delete(req: Request, res: Response): void {

    }

    remove(req : Request, res : Response) : void {
        throw new Error("not implemented");
    }

    private isCreateRegisterBody(req: Request) : boolean{
        return req.body.user && isValidObjectId(req.body.user);
    }

}


