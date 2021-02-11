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
            CustomResponse.badRequest("Insufficient parameters",res);
        }
    }

    // gets all registers with same user id
    get(req : Request, res: Response): void {
        if(req.params.user_id && isValidObjectId(req.params.user_id)){
            this.service.getByUser(req.params.user_id, (err : any, registers : IRegister[]) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else{
                    CustomResponse.successResponse("registers by user found",registers,res);
                }
            })
        }else{
            CustomResponse.badRequest("Id not valid or missing",res);
        }
    }

    getRange(req : Request, res : Response) : void{
        let first_query = req.query.first;
        let last_query = req.query.last;
        if(first_query && last_query){
            let first = parseInt(first_query as any);
            let last = parseInt(last_query as any);
            if(first >=last){
                CustomResponse.badRequest("Query params : last must be greater than first",res);
            }else{
                
                this.service.getRange(first,last,(err : any, registers : IRegister[]) => {
                    if(err){
                        CustomResponse.mongoError(err, res);
                    }else{
                        CustomResponse.successResponse("registers in range found",registers,res);
                    }
                })
            }
        }else{
            CustomResponse.badRequest("Query params : first or last are missing",res);
        }
    }


    //gets all registers
    getAll(req : Request, res: Response): void {
        this.service.getAll((err : any, registers : IRegister[]) => {
            if(err){
                CustomResponse.mongoError(err, res);
            }else{
                CustomResponse.successResponse("registers by user detected",registers,res);
            }
        })
    }

    update(req: Request, res: Response): void {
       throw new Error("not implemented");
    }

    delete(req: Request, res: Response): void {
        throw new Error("not implemented");
    }

    remove(req : Request, res : Response) : void {
        throw new Error("not implemented");
    }

    private isCreateRegisterBody(req: Request) : boolean{
        return req.body.user && isValidObjectId(req.body.user);
    }

}


