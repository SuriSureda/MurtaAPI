import { Application } from "express";
import IController from "../controllers/IController";

export default abstract class Route<T extends IController>{
    path : string;
    controller : T;

    constructor(path : string, controller : T){
        this.path = path;
        this.controller = controller;
    }

    abstract route(app : Application) : void;

}