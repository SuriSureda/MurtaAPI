import { Application } from "express";
import Controller from "../controllers/Controller";

export default abstract class Route<T extends Controller<any>>{
    path : string;
    controller : T;

    constructor(path : string, controller : T){
        this.path = path;
        this.controller = controller;
    }

    abstract route(app : Application) : void;

}