const express=require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
require('dotenv').config()

const mongoose=require('mongoose')


const app=express();
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

require('./db/conn')

app.use(express.json())

const Patient=require('./model/Patient')
const Doctor=require('./model/Doctor')
const Admin=require('./model/Admin')

const PORT=process.env.PORT;

app.use(require('./router/auth'));


app.listen(PORT,()=>{
    console.log(`server litsening at port ${PORT}`)
})