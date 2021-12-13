const Blog = require("../models/blogSchema");

async function postBlog(request, response) {
  const newBlog = request.body;
  console.log(newBlog);
  await Blog.insertMany(newBlog);
  response.send("new blog as been inserted successfully to the database");
}

async function getAllBlogs(request, response) {
  const allBlogs = await Blog.find({});
  response.send(allBlogs);
}

module.exports = { postBlog, getAllBlogs };
