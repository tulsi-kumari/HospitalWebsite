const express=require('express')
const router=express.Router();
var bcrypt = require('bcryptjs');
const Patient=require('../model/Patient')
const Doctor=require('../model/Doctor')
const Admin=require('../model/Admin')
const AuthPatient=require('../middleware/AuthPatient')
const AuthDoctor=require('../middleware/AuthDoctor')
const AuthAdmin=require('../middleware/AuthAdmin')
const AuthLogout=require('../middleware/AuthLogout')



require('../db/conn')




router.post('/signinPatient',async (req,res)=>{


    const {email,password}=req.body;


     if(!email||!password){
        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }


    try{


        const foundPatient=await Patient.findOne({email:email});

        if(!foundPatient){
            return res.status(422).json({error:"invalid credentials "})
        }
        

        const isMatch = await bcrypt.compareSync(password,foundPatient.password)


        if(!isMatch){
            return res.status(422).json({error:"invalid credentials"})
        }


          const token= await foundPatient.createToken();
          res.cookie("jwtoken",token,{
            httpOnly:true
          })


        res.status(201).json({message:"Logged in successfully"})


    }catch(err){

         console.log(err);

    }
    
})



router.post('/signinDoctor',async (req,res)=>{


    const {email,password}=req.body;

     if(!email||!password){
        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }

    try{

        const foundDoc=await Doctor.findOne({email:email});

        if(!foundDoc){
            return res.status(422).json({error:"invalid credentials "})
        }

        const isMatch = await bcrypt.compareSync(password,foundDoc.password)

        if(!isMatch){

            return res.status(422).json({error:"invalid credentials"})

        }


        const token= await foundDoc.createToken();
        res.cookie("jwtoken",token,{
         httpOnly:true
        })


        res.status(201).json({message:"Logged in successfully"})


    }catch(err){

         console.log(err);

    }
})



router.post('/signinAdmin',async (req,res)=>{


     const {email,password}=req.body;
     if(!email||!password){
        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }


    try{
        const foundAdmin=await Admin.findOne({email:email});

        if(!foundAdmin){
            return res.status(422).json({error:"invalid credentials "})
        }

        const isMatch = await bcrypt.compareSync(password,foundAdmin.password)
        if(!isMatch){
            return res.status(422).json({error:"invalid credentials"})
        }


        const token= await foundAdmin.createToken();
        res.cookie("jwtoken",token,{
          httpOnly:true
        })

        res.status(201).json({message:"Logged in successfully"})

    }catch(err){

         console.log(err);

    }
})




//adding new Patient
router.post('/registerPatient',async (req,res)=>{


    const {username,password,cpassword,email,contact,age,address,disease}=req.body;
    if(!username||!password||!cpassword||!email||!contact||!age||!address||!disease){
        console.log("empty fields")
        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }

    
    try{
        const foundPatient=await Patient.findOne({email:email});

        if(foundPatient){
            console.log("Email Already exists")
            return res.status(422).json({error:"Email Already exists"})
        }


        if(password!=cpassword){
            console.log("passwords do not match")
            return res.status(422).json({error:"passwords do not match"})
        }
        const p=new Patient({username,password,cpassword,email,contact,age,address,disease});


        await p.save();
        console.log("Patient registered successfully")
        res.status(201).json({message:"Patient registered successfully"})

    }catch(err){

         console.log(err);

    }
})



//adding new Doctor
router.post('/registerDoctor',async (req,res)=>{


    const {username,password,cpassword,email,contact,age,address,speciality}=req.body;
    if(!username||!password||!cpassword||!email||!contact||!age||!address||!speciality){
        console.log("empty fields")
        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }
    
    try{
        const foundDoc=await Doctor.findOne({email:email});

        if(foundDoc){
            console.log("Email Already exists")
            return res.status(422).json({error:"Email Already exists"})
        }


        if(password!=cpassword){
            return res.status(422).json({error:"passwords do not match"})
        }


        const d=new Doctor({username,password,cpassword,email,contact,age,address,speciality});

        await d.save();
        console.log("Doctor registered successfully")
 
        res.status(201).json({message:"Doctor registered successfully"})

    }catch(err){

         console.log(err);

    }
})

//adding new Admin
router.post('/registerAdmin',async (req,res)=>{


    const {username,password,cpassword,email,contact,age,address}=req.body;
   
    if(!username||!password||!cpassword||!email||!contact||!age||!address){

        return res.status(422).json({error:"Please fill all the given feilds properly"})
    }
    
    try{


        const foundAdmin=await Admin.findOne({email:email});

        if(foundAdmin){
            console.log("Email Already exists")
            return res.status(422).json({error:"Email Already exists"})
        }
        if(password!=cpassword){
            return res.status(422).json({error:"passwords do not match"})
        }


        const a=new Admin({username,password,cpassword,email,contact,age,address});

        await a.save();
        console.log("Admin registered successfully")

        res.status(201).json({message:"Admin registered successfully"})

    }catch(err){

         console.log(err);

    }
})

//creating PatientsPage route

router.get('/patientPage',AuthPatient,async(req,res)=>{
    res.status(201).json({message:"user is verified patient",data:req.rootUser});
})

//creating AdminPage route

router.get('/adminPage',AuthAdmin,async(req,res)=>{
    res.status(201).json({message:"user is verified admin"});
})

//creating DoctorPage route
router.get('/doctorPage',AuthDoctor,async(req,res)=>{
    res.status(201).json({message:"user is verified doctor"});
})

router.get('/logout',AuthLogout,async(req,res)=>{
   try{
    console.log(req.message)
    res.clearCookie("jwtoken"); 
    console.log("logout");
    await req.rootUser.save();
    res.status(200).json({message:"cookie cleared"})
   }catch(err){
    console.log(err);
   }
})

router.get('/getAllPatients',async(req,res)=>{
  try{

    const allPatient= await Patient.find({});

    res.json(allPatient);

  }catch(err){
    console.log(err);
    res.status(422).json({error:"error"})
  }
})

router.get('/getAllDoctors',async(req,res)=>{
    try{

        const allDoctor= await Doctor.find({});

        res.json(allDoctor);

  }catch(err){
    console.log(err);
    res.status(422).json({error:"error"})
  }
})

router.get('/getAllAdmins',async(req,res)=>{
    try{

        const allAdmin= await Admin.find({});

        res.json(allAdmin);        

  }catch(err){
    console.log(err);
    res.status(422).json({error:"error"})
  }
})

// router.get('/getPatientDetails',async(req,res)=>{
//  try{
        
//         const token=req.cookies.jwtoken;
//         const verifyToken =jwt.verify(token,process.env.SECRET_KEY);
//         const rootUser=await Patient.findOne({_id:verifyToken._id,"tokens.token":token})
//         if(!rootUser){
//             return res.status(405).json({error:"Unauthorized token"});
//         }
//          res.send(rootUser);

 
//         next();

//    }catch(err){
//         res.status(405).json({error:"Unauthorized token"});
//    }
// })


module.exports=router;



