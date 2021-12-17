const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

async function postBlog(request, response, next) {
  if (!request.user.id) {
    return next({
      status: 401,
      message: "token missing or invalid"
    });
  }

  const user = await User.findById(request.user.id);

  if (user) {
    if (!request.body.title || !request.body.url || !request.body.author) {
      return next({ status: 400, message: "must define a title, author and a url for the blog" });
    }
    let likes = 0;
    if (request.body.likes) likes = request.body.likes;
    const newBlog = { likes, ...request.body };
    const addedBlog = await Blog.create({ user: request.user.id, ...newBlog });
    await User.updateOne(
      { _id: request.user.id },
      { $push: { blogs: addedBlog._id } }
    );

    response.send(addedBlog);
  } else {
    return next({
      status: 401,
      message: 'Unauthorized request'
    });
  }
}

async function getAllBlogs(request, response, next) {
  try {
    const allBlogs = await Blog.find({}).populate("user");
    response.send(allBlogs);
  } catch (error) {
    next(error);
  }
}

async function deleteBlog(request, response, next) {
  try {
    const _id = request.params.id;
    const currentBlog = await Blog.findById(_id.toString());
    if (currentBlog.user.toString() === request.user.id.toString()) {
      const res = await Blog.findByIdAndDelete(_id);
      response.json(res);
    } else {
      next({
        status: 400,
        message: "user can delete just the blogs he have created",
      });
    }
  } catch (error) {
    next({ status: 400, message: "could not delete" });
  }
}


async function updateBlogLikes(request, response, next) {
  try {
    const _id = request.body.id;
    await Blog.updateOne({ _id }, { $inc: { likes: 1 } });
    const newUpdatedBlog = await Blog.findOne({ _id });
    response.json(newUpdatedBlog);
  } catch (error) {
    next(error);
  }
}

module.exports = { postBlog, getAllBlogs, deleteBlog, updateBlogLikes };