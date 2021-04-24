const User =require("../model/userModel");
const createError = require('http-errors');
const bcrypt=require("bcrypt");

const userRegister=async (req,res,next)=>{
    try {
        const addUser = new User(req.body);
        const {error,value}=addUser.joiValidation(req.body);

        if (error) {
            next(createError(400,error));
        }else{
            addUser.password=await bcrypt.hash(addUser.password,10);
            const result = await addUser.save();
            res.send(result);
        }
       
    } catch (err) {
        next(err);
    }
}
const listAllUser = async (req, res,next) => {
    const allUser= await User.find({});
    if (allUser.length>0) {
        res.json(allUser);
    }else{
        res.send("Db de kullanıcı bulunamadı");
    }
    
    
}

const deleteAllUser = async (req, res, next) =>{
    try {
        const deletedUser=await User.deleteMany();
        if (deletedUser) {
           return res.send(deletedUser);
        }else{
            const hata=new Error("Kullanıcı Bulunamadı");
            hata.statusCode=404;
           throw createError(404,"Kullanıcı Bulunamadı");
        }
    } catch (error) {
        next(createError(400, error));
    }
}

const updateUser = async (req,res,next)=>{
    delete req.body.createAt;
    delete req.body.updateAt;
    if (req.body.hasOwnProperty("password")) {
        req.body.password= await bcrypt.hash(req.body.password,10);
    }
    const {error , value }=User.joiValidationUpdate(req.body);
    if (error) {
        next(createError(400,error));
    }else{
        try {
            const result= await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true , runValidators:true})
            if (result) {
                return res.send(result);
            }else{
               next(createError(404,"Kayıt Yok"))
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    userRegister,
    listAllUser,
    deleteAllUser,
    updateUser
}