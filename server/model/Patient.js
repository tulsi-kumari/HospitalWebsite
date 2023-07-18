const mongoose=require('mongoose')
require('mongoose-type-email');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY=process.env.SECRET_KEY;

//Use npm package called validator that can give you a bunch of validations out of the box and not only for just the email



const patientSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        reuired:true
    },
    cpassword:{
        type:String,
        required:true
    },
    email:{
        type:mongoose.SchemaTypes.Email,
        required:[true, "Please enter your email"]
    },
    contact:{
        type:Number,
        required:[true, "Please enter your contact number"]
    },
    age:{
        type:Number,
        required:[true, "Please enter your age"],
        min:0
    },
    address: {
        type:String,
        required:[true, "Please enter your address"]
    },
    disease:{
        type:String,
        required:[true, "Please enter your email"]
    },
    tokens : [{
         token:{
            type:String,
            required:true
         }
    }]
})

patientSchema.methods.createToken= async function(){
    try{
        const token=await jwt.sign({_id:this._id},SECRET_KEY);
        this.tokens=this.tokens.concat({token : token});
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

patientSchema.pre('save',async function(next){

    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
    }
    next();
});

const Patient=mongoose.model('Patient',patientSchema);

module.exports=Patient;