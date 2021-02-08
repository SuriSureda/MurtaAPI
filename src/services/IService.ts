import IObject from "../models/IObject";

export default interface IService{

    create  (params : IObject, callback : any);
    get     (id : string, callback : any);
    update  (params : IObject, callback : any);
    remove  (id : string, callback : any);

}