const jwt=require('jsonwebtoken')
const Patient=require('../model/Patient')

const AuthPatient = async(req,res,next) => {
   
     try{
        
        const token=req.cookies.jwtoken;
        const verifyToken =jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await Patient.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser){
            return res.status(405).json({error:"Unauthorized token"});
        }
        console.log("patient token")                 
            req.token=token;
            req.rootUser=rootUser;
            req._id=rootUser._id;
 
        next();

   }catch(err){
        res.status(405).json({error:"Unauthorized token"});
   }

}

module.exports= AuthPatient;