import RegisterController from '../controllers/RegisterController';
import {Application, Request, Response } from 'express';
import Route from './Route'

export default class RegisterRoute extends Route<RegisterController>{

    constructor(path : string){
        let contoller : RegisterController = new RegisterController();
        super(path,contoller);
    }

    route(app : Application){
        
        app.post(this.path, (req : Request, res : Response) => {
            this.controller.create(req,res);
        });

        //range on query
        app.get(this.path+"/range", (req : Request, res : Response) => {
            this.controller.getRange(req, res);
        })

        app.get(this.path+"/:user_id", (req : Request, res : Response) => {
            this.controller.get(req,res);
        });

        app.get(this.path, (req : Request, res : Response) => {
            this.controller.getAll(req, res);
        })

        //update and delete not necessary for now

    }

}