import {Application, Request, Response } from 'express';
import CommonRoute from './CommonRoute';
import RegisterRoute from './RegisterRoute';
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
        
        //Register Route
        let register_route = new RegisterRoute('/register');
        register_route.route(this.app);

        //COMMON ROUTES (LAST !!!)
        let common_route = new CommonRoute();
        common_route.route(this.app);
    }
    
}