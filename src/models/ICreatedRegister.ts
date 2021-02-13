import ICreatedUser from "./ICreatedUser";
import IRegister from "./IRegister";

export default interface ICreatedRegister{
    _id : IRegister['_id'],
    user : IRegister['user'],
    date : IRegister['date']
}