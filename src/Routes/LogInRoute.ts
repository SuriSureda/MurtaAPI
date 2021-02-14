import { Application , Request, Response} from "express";
import LogInController from "../controllers/LogInController";
import AuthController from "../controllers/LogInController";
import Route from "./Route";

export default class LogInRoute extends Route<LogInController>{

    constructor(path : string){
        let logInController = new LogInController();
        super(path,logInController);
    }
    
    route (app : Application) : void{
        app.post(this.path, (req : Request, res : Response) => {
            this.controller.singIn(req,res);
        })
    }
}