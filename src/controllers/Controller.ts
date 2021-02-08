import { Request, Response } from 'express';
import IService from '../services/IService';

export default abstract class Controller<T extends IService>{
    
    service : T;
    
    constructor(service : T){
        this.service = service;
    }

}