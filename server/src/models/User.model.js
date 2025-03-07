import mongoose , {Schema} from "mongoose"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    name : {
        type : String ,
        required : true ,
        trim : true ,
        lowercase : true ,
        index : true
    },

    email : {
        type : String ,
        required : true ,
        unique : true ,
        trim : true,
        lowercase : true ,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]

    },

    password : {
        type : String , 
        required : [true , "password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },

    role : {
        type : String ,
        required : true ,
        enum : ["farmer" , "mentor" , "exporter"]   // role based
        
    },

    refreshToken : {
        type : String
    }

} , {timestamps : true})


 // Hash (encrypt) Password Before Saving
 userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

 // Compare Passwords
 userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

 // generating refresh and access token
 userSchema.methods.generateAccessToken = function (){
    return jwt.sign(

        {
            _id : this._id ,
            email : this.email ,
            name : this.name
        },

        process.env.ACCESS_SECRET ,

        {
            expiresIn: process.env.ACCESS_EXPIRY || "15m"
        }
    )
 }

 userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id : this._id
        },

        process.env.REFRESH_SECRET ,

        {
            expiresIn: process.env.REFRESH_EXPIRY || "7d"  
        }
    )
 }


export const User = mongoose.model("User" , userSchema)