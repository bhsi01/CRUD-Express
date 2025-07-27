// import express 
const express=require("express");
const app=express();

const port=8080;    //define port

// set EJS 
app.set("view engine","ejs");
const path=require("path");
app.set("views",path.join(__dirname,"/views"));

const { v4: uuidv4 } = require('uuid'); //import uuid

app.use(express.urlencoded({ extended: true }));    //this enables app to read data via post request

// it enable to use patch and delete using method override 
const methodOverride=require("method-override");
app.use(methodOverride('_method'));

//this is data array
let data=[
    {
        id:uuidv4(),
        content:"content 1"
    },
    {
        id:uuidv4(),
        content:"content 2"
    }
];

//start server and listen at port
app.listen(port,()=>{
    console.log("listening on :",port);
}) 

// define root route
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

//define posts route which shows all the posts
app.get("/posts",(req,res)=>{
    res.render("posts.ejs",{data});
})

// create new post
app.get("/posts/data",(req,res)=>{
    res.render("create.ejs",{data});
})

// takes data of new post and update it in array
app.post("/posts/data",(req,res)=>{
    let {content}=req.body;
    data.push({id:uuidv4(),content});
    res.redirect("/posts");
})

// shows the data of the post
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=data.find(d=>d.id===id);
    res.render("show.ejs",{post});
})

// update the data using patch request
app.get("/posts/:id/update",(req,res)=>{
    let post=data.find(d=>d.id===req.params.id);
    res.render("update.ejs",{post});
})
app.patch("/posts/:id/update",(req,res)=>{
    let {id}=req.params;
    let post=data.find(d=>d.id===id);
    let content=req.body.update;
    post.content=content;
    res.redirect("/posts");
})

// delete the data 
app.delete("/posts/:id/delete",(req,res)=>{
    let {id}=req.params;
    data=data.filter(d=>d.id!==id);
    res.redirect("/posts");
})