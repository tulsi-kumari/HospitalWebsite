const mongoose=require('mongoose')
require('mongoose-type-email');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY=process.env.SECRET_KEY;

//Use npm package called validator that can give you a bunch of validations out of the box and not only for just the email



const adminSchema=new mongoose.Schema({
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
        required:[true, "Please enter your age"]
    },
    address: {
        type:String,
        required:[true, "Please enter your address"]
    },
    tokens : [{
         token:{
            type:String,
            required:true
         }
    }]
})

adminSchema.methods.createToken= async function(){
    try{
        const token=await jwt.sign({_id:this._id},SECRET_KEY);
        this.tokens=this.tokens.concat({token : token});
        await this.save();
        return token;
    }catch(err){
        console.log(err)
    }
}

adminSchema.pre('save',async function(next){

    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
    }
    next();
});

const Admin=mongoose.model('Admin',adminSchema);

module.exports=Admin;