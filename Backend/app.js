const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// mongoose.connect("mongodb+srv://vivekpurohit:vDyCPxywzTjoXBeZ@cluster0.9iecxgq.mongodb.net/node-angular?retryWrites=true&w=majority")
//   .then(()=>{
//     console.log('connected to the db');
//   }).catch((error)=>{
//     console.log(error);
//   });

mongoose.connect('mongodb://localhost:27017/POST_GRAM')
  .then(()=>{
    console.log('connected to the db');
  }).catch((error)=>{
    console.log(error);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
})

app.post('/api/CreatePost',(req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(result => {
    res.status(201).json({
      message: 'Post created successfully.',
      postId: result._id
    });
  });
})

app.get('/api/posts',(req,res,next)=>{
  Post.find().then(posts => {
    res.status(200).json({
      message: 'Post fetched succesfully',
      posts : posts
    });
  }).catch((error)=>{
    console.log(error);
  });
});

app.delete('/api/DeletePost/:id',(req,res,next)=>{
  Post.deleteOne({_id: req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({
      message : 'Post deleted'
    })
  })
})


module.exports = app;
