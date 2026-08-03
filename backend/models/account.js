import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    pass:{
        type:String,
        required:true,
    }
    },    
    {
        timestamps:true
    }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;