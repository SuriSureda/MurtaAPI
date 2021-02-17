import { Application, Request, Response } from "express";
import CustomResponse from "../CustomResponse";
import Route from "./Route";

export default class CommonRoute{

    private app : Application;

    public route(app : Application) : void{
        //route to avoid heroku to fall aslepp
        app.get('/wake', (req : Request, res : Response) => {
            CustomResponse.successResponse("not asleep yet",null,res);
        })

        app.all('*', (req: Request, res: Response)=> {
            CustomResponse.badRequest("Check URL", res);
        })
    }

}