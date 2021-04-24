const mongoose =require('mongoose');
const dotenv= require('dotenv').config();
const db = process.env.DB_CONNECT;
mongoose.connect(db , {useCreateIndex:true,useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false }).then(()=>{
    console.log("Db ye bağlanıldı");
}).catch(err => console.log("Db ye bağlanılamamdı"));