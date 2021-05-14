const User =require("../model/userModel");
const createError = require('http-errors');
const bcrypt=require("bcrypt");

const userRegister=async (user)=>{
    try {
        const addUser = new User(user);
        const {error,value}=addUser.joiValidation(user);

        if (error) {
            next(createError(400,error));
        }else{
            addUser.password=await bcrypt.hash(addUser.password,10);
            const result = await addUser.save();
            return result;
        }
       
    } catch (err) {
        next(err);
    }
}
const listAllUser = async () => {
    const allUser= await User.find({});
    if (allUser.length>0) {
        return allUser;
    }else{
        res.send("Db de kullanıcı bulunamadı");
    }
    
    
}

const deleteAllUser = async () =>{
    try {
        const deletedUsers=await User.deleteMany();
        if (deletedUsers) {
           return deletedUsers;
        }else{
            /* const hata=new Error("Kullanıcı Bulunamadı");
            hata.statusCode=404; */
           throw createError(404,"Kullanıcı Bulunamadı");
        }
    } catch (error) {
        next(createError(400, error));
    }
}

const updatedUser = async (user,id)=>{
    delete user.createAt;
    delete user.updateAt;
    if (user.hasOwnProperty("password")) {
        user.password= await bcrypt.hash(user.password,10);
    }
    const {error , value }=User.joiValidationUpdate(user);
    if (error) {
        next(createError(400,error));
    }else{
        try {
            const result= await User.findByIdAndUpdate({_id:id},user,{new:true , runValidators:true})
            if (result) {
                return result;
            }else{
               next(createError(404,"Kayıt Yok"))
            }
        } catch (error) {
            next(error);
        }
    }
}
const userSignIn= async function(email, password) {
    try {
     const user= await User.login(email,password);
     const token = await user.generateToken();
     console.log("Çalıştı");

     return {
         user,
         token
     };
    } catch (error) {
        next(error);
    }

}

module.exports={
    userRegister,
    listAllUser,
    deleteAllUser,
    updatedUser,
    userSignIn
}