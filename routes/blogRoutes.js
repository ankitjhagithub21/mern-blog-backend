const express = require('express');
const multer = require('multer');
const blogRouter = express.Router();
const { authenticate } = require('../middleware/verifyToken');
const blogController = require('../controllers/blogController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Create a new blog
blogRouter.post('/upload', upload.single('image'), authenticate, blogController.createBlog);

// Delete a blog
blogRouter.delete('/:id', authenticate, blogController.deleteBlog);

// Update a blog
blogRouter.put('/:id', authenticate, blogController.updateBlog);

//get all blogs
blogRouter.get("/",authenticate,blogController.getAllBlogs)

//get single blog
blogRouter.get("/:id",authenticate,blogController.getBlog)

module.exports = blogRouter;
