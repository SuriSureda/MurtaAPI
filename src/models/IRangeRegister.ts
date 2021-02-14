import IRegister from "./IRegister";

export default interface IRangeRegister{
    remaining : boolean, //if remaining registers to get
    registers : IRegister[];
}