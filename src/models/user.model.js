import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
//jwt is a bearer token
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username :{
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type: String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullName : {
        type: String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type: String, //cloudinary url
        required : true,
    },
    coverimage : {
        type: String
    },
    watchhistory : [{
        type: Schema.Types.ObjectId,
        ref : "Video"
    }],
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    refreshtoken : {
        type : String
    }
}, {timestamps : true})


//dont use arrow function as they dont have access to THIS.
userSchema.pre("save",async function(next){
    //so that if some other field changes it doesnt run
    if(!this.isModified("password")) return
    //when password is changed then
    this.password = bcrypt.hash(this.password, 10)
    next()
})

//validating when user logins 
userSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        username : this.username,
        fullName : this.fullName
    },process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id : this._id
    },process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)