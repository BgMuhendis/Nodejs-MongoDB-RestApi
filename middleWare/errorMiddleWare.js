const hataYakalayici=(err,req,res,next)=>{

    if (err.code===11000) {
       return res.json({
            message: Object.keys(err.keyValue)+" için girdiğiniz "+ Object.values(err.keyValue) +"  unique olmalıdır",
            statusCode:err.code
            
        });
    }
    if(err.code===66){
      return  res.json({
            message: "Bu alan değiştitirilemez",
            statusCode:err.code
            
        });
    }

     res.json({
            status:err.statusCode || 500,
            message:err.message
        })
    
}
module.exports=hataYakalayici;