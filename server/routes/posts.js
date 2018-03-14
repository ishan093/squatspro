

const Post = require('../models/posts');
const router = require('express').Router();
const isauth = require('../Auth/index');

router.post('/add',isauth.isAuthenticated, (req, res) => {

 const newPost = new Post();

 newPost.username = req.body.username
 newPost.title = req.body.title;
 newPost.body=req.body.postBody;
 newPost.save((err, user) => {
   if (err) {
     console.log(err)
   }
   else
   {
    res.json({success:true});
   }

 });

    
});

router.get('/get',isauth.isAuthenticated, (req, res) => {
  
  Post.find({},(err, blogs) => {
    if (err) {
      console.log(err)
    }
   res.json(blogs);
 
  });
 
     
 });

 router.get('/get/:id',isauth.isAuthenticated, (req, res) => {
  
  console.log(req.params.id)
  Post.find({username:req.params.id},(err, blogs) => {
    if (err) {
      console.log(err)
    }
   res.json(blogs);
 
  });
 
     
 });

module.exports = router;
