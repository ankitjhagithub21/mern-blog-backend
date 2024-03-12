const Blog = require('../models/blog');

// Function to create a new blog
exports.createBlog = async (req, res) => {
  try {
    const userId = req.id;
    const { title, content } = req.body;
    const imagePath = req.file.path;

    const newBlog = new Blog({
      title,
      content,
      image:imagePath,
      userId
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog Uploaded Successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Function to delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Function to update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    await Blog.findByIdAndUpdate(id, { title, content });

    res.status(200).json({
      success: true,
      message: "Blog Updated Successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//Function to get all blogs 

exports.getAllBlogs = async(req,res) =>{
    try{
        const userId = req.id;
        const blogs = await Blog.find({userId})
        if(!blogs || blogs.length==0){
            return res.status(404).json({
                success:false,
                message:"Blog not found."
            })
        }
        
        res.json({blogs})
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
          });
    }
}

//Function to get single blog

exports.getBlog = async(req,res) =>{
  try{
    const {id} = req.params
    const blog = await Blog.findById(id)
    if(!blog){
      return res.status(404).json({
        success:false,
        message:"Blog not found."
      })
    }
    res.status(200).json({
      success:true,
      message:"Blog found.",
      blog
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
}