import {Application, Request, Response } from 'express';
import UserRoute from './UserRoute';


export default class Router{

    app : Application;

    constructor(app : Application){
        this.app = app;
        this.route();
    }

    private route(){
        //ROUTING TO EACH ROUTE
        // User Route
        let user_route = new UserRoute('/user');
        user_route.route(this.app);
    }
    
}