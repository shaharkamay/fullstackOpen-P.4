const express = require("express");
const ApiRouter = express.Router();
const blogRouter = require('./blogRoute');
const userRouter = require('./userRoute');
const loginRouter = require('../controllers/login');
const authMiddleware = require("../middlewares/auth");

// ApiRouter.get("/blogs", getAllBlogs);

// ApiRouter.post("/blogs", postBlog);

// ApiRouter.delete("/blogs/:id", deleteBlog);

// ApiRouter.put("/blogs/update", updateBlogLikes);

ApiRouter.use("/blogs", authMiddleware, blogRouter);

ApiRouter.use("/users", authMiddleware, userRouter);

ApiRouter.use("/login", loginRouter);

module.exports = ApiRouter;
