
import * as mongoose from 'mongoose';

const Schema  = mongoose.Schema;

const RegisterSchema  = new Schema({
    date : {
        type : Date,
        required : [true, "Date is required"]
    },
    user : {
        type : Schema.Types.ObjectId,
        required : [true, "User is required"]
    },
    deleted : Boolean
})

export default mongoose.model('Register', RegisterSchema);

