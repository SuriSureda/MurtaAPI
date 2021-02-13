
import * as mongoose from 'mongoose';
import EmailValidator from '../../validator/EmailValidator';
import PasswordValidator from '../../validator/PasswordValidator';


const Schema  = mongoose.Schema;

const UserSchema  = new Schema({
    user_name : {
        type : String,
        unique : [true, "User name must be unique"],
        required : [true, "User name is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email must be unique"],
        validate : [EmailValidator.isEmail, "Wrong email form"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        validate : [PasswordValidator.isPassword, "Password must have at least 8 characters"],
        select : false
    },
    deleted : {
        type : Boolean,
        default : false,
        select : false
    }
})

export default mongoose.model('User', UserSchema);

