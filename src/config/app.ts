import * as express from "express";
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

import Router from "../Routes/Router";


dotenv.config();


class App {
   public app: express.Application;
   private router : Router;

   constructor() {
      this.app = express();
      this.config();
      this.connectDB(process.env.DB_CONNECTION);
      //Initializes myRouter to start routing
      this.router = new Router(this.app);
   }
   
   private connectDB(path : string) {
      mongoose.connect(
        `${process.env.DB_CONNECTION}`,
         {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex : true, useFindAndModify : false},
         (err) => {
            if(err){
               console.log("An error while connecting to DB");
            }else{
               console.log("Connected succesfully to DB");
            }
         }   
       )
   }

   private config(): void {
      // support application/json type post data
      this.app.use(express.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(express.urlencoded({ extended: false }));
   }
}

export default new App().app;