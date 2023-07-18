const mongoose=require('mongoose')

const DB=process.env.DATABASE_API;
const PORT=process.env.PORT;

//mongoose connection
mongoose.connect(DB).then(()=>{
    console.log("Connected to our database")
}).catch((err)=>{
    console.log(err)
})

