const express = require("express");
const { getAllUsers, postUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.post("/", postUser);

// userRouter.delete("/:id", deleteBlog);

// userRouter.put("/update", updateBlogLikes);

module.exports = userRouter;