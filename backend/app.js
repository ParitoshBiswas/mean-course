const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post');
const app = express();

//=================Connection To MongoDB=========================

mongoose.connect("mongodb+srv://Paritosh_Biswas:MLMEIfZqtxH88QsP@cluster0.e17xz8q.mongodb.net/").then(() => {
    console.log("Connected to database successfully!");
}).catch(() => {
    console.log("Connection failed");
});

//====================End Of Conection=========================== 

// Body parser to grab the data send inside request call 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//========================Handling CORS Middleware=========================

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

//===========================End Of CORS=============================

//===============Add Post REST API Middleware====================
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();      // saving post to mongoDB
    // console.log(post);
    res.status(201).json({ message: "Post Added successfully." });
});

//================Get All Posts REST API Middleware=================
app.get("/api/posts", (req, res, next) => {

    Post.find().then(documents => {
        console.log(documents);
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents});
    }); 
});

module.exports = app;