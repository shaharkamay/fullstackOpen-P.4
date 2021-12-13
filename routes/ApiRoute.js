const express = require("express");
const { postBlog, getAllBlogs } = require("../controllers/ApiController");
const Blog = require("../models/blogSchema");
const ApiRouter = express.Router();

ApiRouter.get("/blogs", getAllBlogs);

ApiRouter.post("/blogs", postBlog);

module.exports = ApiRouter;
