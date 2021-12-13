const Blog = require("../models/blogSchema");
const axios = require("axios");
const getDB = async () => {
  const response = await axios.get("http://localhost:3003/api/blogs");
  return response.data;
};

const blogs = getDB();

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  for (const blog of blogs) {
    sum += blog.likes;
  }
  return sum;
};

const favoriteBlog = (allBlogs) => {
  let mostLikable = { likes: 0 };
  for (const blog of allBlogs) {
    if (mostLikable.likes < blog.likes) {
      mostLikable = blog;
    }
  }
  delete mostLikable._id;
  return mostLikable;
};

const mostBlogs = (blogs) => {
  const authors = [];
  for (const blog of blogs) {
    if (authors.length === 0) {
      authors.push({
        author: blog.author,
        blogs: 0,
      })
    }
    if (!(authors.find(author => author.author === blog.author))) {
      authors.push({
        author: blog.author,
        blogs: 0,
      })
    }
    for (const author of authors) {
      if (author.author === blog.author) {
        author.blogs++;
      }
    }
  }

  let mostBlogsAuthor = { blogs: 0 };
  for (const author of authors) {
    if (mostBlogsAuthor.blogs < author.blogs) {
      mostBlogsAuthor = author;
    }
  }
  return mostBlogsAuthor;

};

const mostLikes = (blogs) => {
  const authors = [];
  for (const blog of blogs) {
    if (authors.length === 0) {
      authors.push({
        author: blog.author,
        likes: 0,
      })
    }
    if (!(authors.find(author => author.author === blog.author))) {
      authors.push({
        author: blog.author,
        likes: 0,
      })
    }
    for (const author of authors) {
      if (author.author === blog.author) {
        author.likes += blog.likes;
      }
    }
  }

  let mostLikesAuthor = { likes: 0 };
  for (const author of authors) {
    if (mostLikesAuthor.likes < author.likes) {
      mostLikesAuthor = author;
    }
  }
  return mostLikesAuthor;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
