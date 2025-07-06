const port=4000;
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors=require("cors");
const orderRoute = require('./order');
const newsletterRoute = require('./newsletter');



app.use(express.json());
app.use(cors());
app.use(orderRoute);
app.use('/',newsletterRoute);


mongoose.connect("mongodb+srv://Priyanshu5313:9572@cluster0.xrts3ya.mongodb.net/winkwear");

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

const storage=multer.diskStorage({
    destination:'./uploads/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const uploads=multer({storage:storage});

app.use("/uploads",express.static("uploads/images"));
app.post("/uploads",uploads.single("product"),(req,res)=>{
    res.json({
        success:true,
        imageUrl:`http://localhost:${port}/uploads/${req.file.filename}`
    });
})
//mongoose model
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    images:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

//add products
app.post('/addproduct', async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id +1;
    }
    else{
        id=1;
    }

    const product=new Product({
        id:id,
        name:req.body.name,
        images:req.body.images,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//remove products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({
        id:req.body.id
    })
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//all products
app.get('/allproducts',async(req,res)=>{
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
})

const Users=mongoose.model("Users",{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({
        email:req.body.email
    })
    if(check){
        return res.status(400).json({
            success:false,
            errors:"User Already Exists"
        })
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user=new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    const token=jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

app.post('/login',async(req,res)=>{
    let user=await Users.findOne({
        email:req.body.email,
    })
    if(user){
        const passCompare=user.password===req.body.password;
        if(passCompare){
            const data={
                user:{
                    id:user.id
                }
            }
            const token=jwt.sign(data,'secret_ecom');
            res.json({success:true,token})

        }
        else{
            res.json({
                success:false,
                errors:"Invalid Password"
            });
        }
    }
    else{
        res.json({
            success:false,
            errors:"Wrong Email Id"
        });
    }
})

app.get('/newcollection',async(req,res)=>{
    let products=await Product.find({});
    let newcollection=products.slice(1).slice(-8);
    console.log("New Collection Fetched");
    res.send(newcollection);
})

app.get('/popularinwomen',async(req,res)=>{
    let products=await Product.find({category:"women"});
    let popular_in_women=products.slice(0,4);
    res.send(popular_in_women);
})

const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"});
    }
    try{
        const data=jwt.verify(token,'secret_ecom');
        req.user = data.user;
        next();
    }catch(error){
        res.status(401).send({errors:"please authenticate using valid token"})
    }
}

app.post('/addtocart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send(" Item Added")
})

app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Item Removed") 
})

app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart");
    let userData=await Users.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port "+ port)
    }
    else{
        console.log("Error:"+ error)
    }
})
