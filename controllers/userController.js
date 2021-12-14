const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");

async function postUser(request, response, next) {
  if (!request.body.username || !request.body.password || !request.body.name) {
    return next({
      status: 400,
      message: "user must have a username,password and a name",
    });
  }
  const { username, password, name } = request.body;
  if (validator.isLength(password, { max: 2 }) || validator.isLength(username, { max: 2 })) {
    return next({
      status: 400,
      message: "username and password must be minimum 3 characters",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newHashedUser = {
    username: username,
    password: hashPassword,
    name: name,
  };
  const newFullUser = await User.create(newHashedUser);
  response.send(newFullUser);
}

async function getAllUsers(request, response, next) {
  try {
    const allUsers = await User.find({}).populate("blogs", {
      title: 1,
      url: 1,
      likes: 1
    });
    response.send(allUsers);
  } catch (error) {
    next(error);
  }
}

// async function deleteBlog(request, response, next) {
//   try {
//     const _id = request.params.id;
//     if (!_id) throw Error("no id");
//     const res = await Blog.findByIdAndDelete(_id);
//     response.json(res);
//   } catch (error) {
//     next({ status: 500, message: "could not delete" });
//   }
// }

// async function updateBlogLikes(request, response, next) {
//   try {
//     const _id = request.body._id;
//     const likes = request.body.likes;
//     await Blog.updateOne({ _id }, { $set: { likes } });
//     const newUpdatedBlog = await Blog.findOne({ _id });
//     response.json(newUpdatedBlog);
//   } catch (error) {
//     next(error);
//   }
// }

module.exports = { getAllUsers, postUser };