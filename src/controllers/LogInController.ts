import {Request, Response } from "express";
import Auth from "../Auth";
import CustomResponse from "../CustomResponse";
import IAuthUser from "../models/IAuthUser";
import IUser from "../models/IUser";
import UserService from "../services/UserService";
import Controller from "./Controller";

export default class LogInController extends Controller<UserService>{

    constructor(){
        let userService = new UserService();
        super(userService);
    }

    create(req : Request, res : Response) : void{
        throw new Error("not implemented");
    };

    get(req : Request, res : Response) : void {
        throw new Error("not implemented");
    };

    update(req : Request, res : Response) : void {
        throw new Error("not implemented");
    };

    delete(req : Request, res : Response) : void {
        throw new Error("not implemented");
    };

    remove(req : Request, res : Response) : void {
        throw new Error("not implemented");
    };

    singIn(req : Request, res : Response) : void{
        let body = req.body;
        if(body.email && body.password){
            this.service.getSignIn(body.email, (err : any, user_data : IUser) => {
                if(err){
                    CustomResponse.badRequest("Error", res);
                }else if(user_data){
                    if(Auth.comparePassword(body.password, user_data.password)){

                        //NOT SECURE PASSWORD ON PAYLOAD
                        let payload : IAuthUser = {
                            _id : user_data._id,
                            user_name : user_data.user_name,
                            email : user_data.email
                        }

                        Auth.getJWT(payload, (err, token) => {
                            if(err){
                                CustomResponse.mongoError(err, res);
                            }else{
                                CustomResponse.successResponse("logged in",{token : token}, res);
                            }
                        });
                        return; 
                    }
                }
                // If not user found or wrong password
                CustomResponse.failureResponse("Email or password wrong", null, res);
            })
        }else{
            CustomResponse.badRequest("Email and password are required.", res);
        }
    }

}