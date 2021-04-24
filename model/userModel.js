const mongoose =require("mongoose");
const Schema=mongoose.Schema;
const Joi = require('@hapi/joi');
var createError = require('http-errors');
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxlength:15,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type: String,
        required:true,
        minLength:6,
    
    },
});

const schema = Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().min(6)

},{collections:"users",timestamps:true});

UserSchema.methods.toJSON= function(){
    const user=this.toObject();
        delete user._id;
        delete user.createdAt;
        delete user.updatedAt;
        delete user.password;
        delete user.__v;
        return user;
}

UserSchema.methods.joiValidation= function (userObject){
    schema.required();
    return schema.validate(userObject);
}

UserSchema.statics.joiValidationUpdate= function (userObject){

    return schema.validate(userObject);
}

const User= mongoose.model("user",UserSchema);
module.exports=User;