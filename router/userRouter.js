const router = require("express").Router();
const userController = require("../controller/userController");

 
router.get("/", userController.listAllUser);
router.post("/register",  userController.userRegister);
router.delete("/" , userController.deleteAllUser);
router.patch("/:id", userController.updateUser); 


module.exports=router;