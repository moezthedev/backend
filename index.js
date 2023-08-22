import express from "express"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt"
const app = express()
const port = 5000
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//Connect Mongodb
mongoose.connect("mongodb://127.0.0.1:27017",{
    dbName:"forms"
}).then(()=>{
    console.log("DB Connected");
}).catch((err)=>console.log(err))

//Mongodb Schema

const formsSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const forms = mongoose.model("form",formsSchema)


//Function
// const isCookieValid = (req,res,next)=>{
//     const cookie = req.cookies.moizcookie
//    if(cookie){
//     next()
//    } else{
//     res.render("login.ejs")
//    }} 

//Routes

app.post("/register",async(req,res)=>{
    const {name,email,password} = req.body
  const person = await forms.findOne({email})
  const hashedPassword = await bcrypt.hash(password,10)
  if(person?.email===email){
    console.log(person.name + " already exists");
  }
  else{
   
    console.log(hashedPassword,"hashed");
  forms.create({name,email,"password":hashedPassword})
  console.log(name+ " created");
  }
   

res.redirect("/")
})
app.get("/",(req,res)=>{
    res.render("register.ejs")
    res.redirect("/")
})

    
//)
// app.post("/login",(req,res)=>{
    
//     res.cookie('moizcookie', '1134145', { maxAge: 900000, httpOnly: true });
  
//     res.redirect("/")
// })

// app.get("/logout",(req,res)=>{
//     res.clearCookie('moizcookie')
//    res.redirect("/")
// })


app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})