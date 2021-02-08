import {Application, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Auth from '../Auth';
import CustomResponse from '../CustomResponse'
import IUser from '../models/IUser';
import UserService from '../services/UserService';
import Controller from "./Controller";
import IController from "./IController";

export default class UserController extends Controller<UserService> implements IController{

    constructor(){
        let service = new UserService();
        super(service);
    }
    
    create(req: Request, res: Response): void {

        if(this.isCreateUserBody(req)){
            let body = req.body;
            let user_params : IUser = {
                user_name : body.user_name,
                email : body.email,
                password : Auth.hashPassword(body.password)
            };

            this.service.create(user_params, (err : any, user_data : IUser) => {
                if(err){
                    CustomResponse.mongoError(err,res)
                }else{
                    CustomResponse.successResponse('user created',user_data,res);
                }
            });

        }else{
            CustomResponse.badRequest(res)
        }
    }

    get(req : Request, res: Response): void {
        if(req.params.id && isValidObjectId(req.params.id)){
            this.service.get(req.params.id, (err : any, user_data : IUser ) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else{
                    CustomResponse.successResponse("get user succesfull", user_data,res);
                }
            })
        }else{
            CustomResponse.badRequest(res);
        }
    }

    getAll(req : Request, res: Response): void {
        this.service.getAll((err : any, users_data : IUser[])=> {
            if(err){
                CustomResponse.mongoError(err, res);
            }else{
                CustomResponse.successResponse("get all users succesfull", users_data,res);
            }
        });
    }

    update(req: Request, res: Response): void {
        if(this.isUpdateUserBody(req)){
            this.service.getWPassword(req.body._id,(err : any, user_data : IUser) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else if(user_data){
                    let body = req.body;
                    let user_to_update : IUser = {
                        _id : body._id,
                        user_name : body.user_name ? body.user_name : user_data.user_name,
                        email : body.email ? body.email : user_data.email,
                        password : body.password ? Auth.hashPassword(body.password) : user_data.password
                    }
                    this.service.update(user_to_update, (err : any, user_updated: IUser) => {
                        if(err){
                            CustomResponse.mongoError(err,res)
                        }else{
                            //to not wait for response update user and avoid password return 
                            delete user_to_update.password;
                            CustomResponse.successResponse('user updated',user_to_update,res);
                        }
                    })
                }else{
                    CustomResponse.failureResponse('could not updated user : invalid user',null, res);
                }
            })
        }else{
            CustomResponse.badRequest(res);
        }
    }

    // mark as deleted
    delete(req : Request, res : Response){
        let _id = req.params.id;
        if(_id && isValidObjectId(_id)){
            this.service.getWPassword(_id,(err : any, user_data : IUser) => {
                if(err){
                    CustomResponse.mongoError(err, res);
                }else{
                    if(user_data){
                        let user_to_delete : IUser = {
                            _id : user_data._id,
                            user_name : user_data.user_name,
                            email : user_data.email,
                            password : user_data.password,
                            deleted : true
                        }
                        this.service.update(user_to_delete, (err : any, user_deleted : IUser) => {
                            //to not wait for response update user and avoid password return 
                            if(err){
                                CustomResponse.mongoError(err, res);
                            }else{
                                delete user_to_delete.password;
                                CustomResponse.successResponse('user updated',user_to_delete,res);
                            }
                        })
                    }else{
                        CustomResponse.failureResponse("user not exists",null,res);
                    }
                }
            })
        }
    }

    remove(req : Request, res : Response){
       throw new Error("not implemented");
    }


    private isUpdateUserBody(req : Request) : boolean {
        let body = req.body;
        return body._id && isValidObjectId(body._id) &&  (body.email || body.password || body.user_name);
    }

    private isCreateUserBody(req : Request) : boolean {
        let body = req.body;
        return body.user_name && body.email && body.password;
    }

}