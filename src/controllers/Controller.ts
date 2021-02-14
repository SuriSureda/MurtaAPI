import { Request, Response } from 'express';
import IService from '../services/IService';

export default abstract class Controller<T extends IService>{
    
    service : T;
    
    constructor(service : T){
        this.service = service;
    }

    abstract create(req : Request, res : Response) : void;
    abstract get(req : Request, res : Response) : void ;
    abstract update(req : Request, res : Response) : void ;
    abstract delete(req : Request, res : Response) : void ;
    abstract remove(req : Request, res : Response) : void ;

}