import {Application, Request, Response } from 'express';
export default interface IController{
    create(req : Request, res : Response) : void;
    get(req : Request, res : Response) : void ;
    update(req : Request, res : Response) : void ;
    delete(req : Request, res : Response) : void ;
    remove(req : Request, res : Response) : void ;
}