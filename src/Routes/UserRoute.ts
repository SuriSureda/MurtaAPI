import UserController from '../controllers/UserController'
import {Application, Request, Response } from 'express';
import Route from './Route'

export default class UserRoute extends Route<UserController>{

    constructor(path : string){
        let contoller : UserController = new UserController();
        super(path,contoller);
    }

    route(app : Application){
        
        app.post(this.path, (req : Request, res : Response) => {
            this.controller.create(req,res);
        });

        app.get(this.path+"/:id", (req : Request, res : Response) => {
            this.controller.get(req,res);
        });

        app.get(this.path, (req : Request, res : Response) => {
            this.controller.getAll(req, res);
        })

        app.put(this.path,(req : Request, res : Response) => {
            this.controller.update(req,res);
        })

        app.delete(this.path+"/:id", (req : Request, res : Response) => {
            this.controller.delete(req, res);
        })
    }

}