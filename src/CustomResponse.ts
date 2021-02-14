import {Application, Request, Response } from 'express';

export default class CustomResponse{
    static unauthResponse(res: Response) {
        res.status(401).json({
            STATUS: 'FAILURE',
            MESSAGE : "bad authentication"
        });        
    }
    static forbiddenResponse(res: Response) {
        res.status(403).json({
            STATUS: 'FAILURE',
            MESSAGE : "not authorized"
        });
    }
    static successResponse(message : string, DATA : any, res : Response){
        res.status(200).json({
            STATUS: 'SUCCESS',
            MESSAGE: message,
            DATA
        });
    }

    static failureResponse(message : string, DATA : any, res : Response){
        res.status(200).json({
            STATUS: 'FAILURE',
            MESSAGE: message,
            DATA
        });
    }

    static badRequest(message : string,res : Response){
        res.status(400).json({
            STATUS: 'FAILURE',
            MESSAGE : message
        });
    }

    static mongoError(err : any,  res : Response){
        res.status(500).json({
            STATUS: 'FAILURE',
            MESSAGE: 'Internal server error',
            DATA : err
        });
    }
}