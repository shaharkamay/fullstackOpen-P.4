const express = require("express");
const { postBlog, getAllBlogs, deleteBlog, updateBlogLikes } = require("../controllers/blogController");
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

blogRouter.post("/", postBlog);

blogRouter.delete("/:id", deleteBlog);

blogRouter.put("/update", updateBlogLikes);

module.exports = blogRouter;
