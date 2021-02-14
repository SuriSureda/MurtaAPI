import { Application , Request, Response} from "express";
import AuthController from "../controllers/AuthController";

export default class LogInRoute{
    private controller : AuthController;
    private path : string;

    constructor(path : string){
        this.path = path;
        this.controller = new AuthController();
    }
    
    route (app : Application) : void{
        app.post(this.path, (req : Request, res : Response) => {
            this.controller.singIn(req,res);
        })
    }
}