const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
   
  },
  content: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
});

const Blog = mongoose.model('blog',blogSchema)
module.exports = Blog

