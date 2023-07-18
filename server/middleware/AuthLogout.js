const jwt=require('jsonwebtoken')
const Admin=require('../model/Admin')
const Patient=require('../model/Patient')
const Doctor=require('../model/Doctor')
const AuthLogout = async(req,res,next) => {
   
     try{
        let rootUser;
        const token=req.cookies.jwtoken;
        if(token==undefined){
            req.message="not a user";
            return res.status(422).json({message:"Not a user"})
        }
        const verifyToken =jwt.verify(token,process.env.SECRET_KEY);

        rootUser=await Admin.findOne({_id:verifyToken._id,"tokens.token":token})

        if(!rootUser){
            rootUser= await Doctor.findOne({_id:verifyToken._id,"tokens.token":token})
            if(!rootUser){
                 rootUser= await Patient.findOne({_id:verifyToken._id,"tokens.token":token})
                 if(!rootUser){
                    req.message="not a user";
                    return res.status(422).json({message:"not a user"})
                 }else{
                    console.log("patient token")        
                    req.token=token;
                    req.rootUser=rootUser;
                    req._id=rootUser._id;
                    next();
                 }
            }else{
                console.log("doctor token")        
                req.token=token;
                req.rootUser=rootUser;
                req._id=rootUser._id;
                next();
            }
        }else{
            console.log("admin token")        
            req.token=token;
            req.rootUser=rootUser;
            req._id=rootUser._id;
            next();
        }

 


   }catch(err){


    console.log(err);
        res.status(405).json({error:"Unauthorized token"});
   }

}

module.exports= AuthLogout;