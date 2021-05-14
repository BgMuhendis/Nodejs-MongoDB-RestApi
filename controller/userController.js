const userService = require("../service/userService");

const userRegister=async (req,res,next)=>{
    try {
        const addUser = await userService.userRegister(req.body);
        res.send(addUser);
    } catch (error) {
        
    }
}
const listAllUser = async (req, res,next) => {
    try {
        const allUser = await userService.listAllUser();
        res.json(allUser);
    } catch (error) {
        next(createError(400,"Bulunamadı"));
    }

    
}

const deleteAllUser = async (req, res, next) =>{
    try {
        const deletedUsers = await userService.deleteAllUser();
        res.send(deletedUsers);
    } catch (error) {
        
    }
}

const updateUser = async (req,res,next)=>{
    try {
        const updatedUser = await userService.updatedUser(req.body,req.params.id);
        res.send(updatedUser);
    } catch (error) {
        
    }
}
const userSignIn= async (req,res,next)=> {
    try {
        const loginUser = await userService.userSignIn(req.body.email,req.body.password);
        res.json(loginUser);
    } catch (error) {
        
    }

}

module.exports={
    userRegister,
    listAllUser,
    deleteAllUser,
    updateUser,
    userSignIn
}