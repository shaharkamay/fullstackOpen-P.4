const Blog = require("../models/blogSchema");
const axios = require("axios");
const for_testing = require("../utils/for_testing");
// beforeAll(() => {
//   console.log("testtesttest");
// });
test("dummy returns one", () => {
  const blogs = [];

  const result = for_testing.dummy(blogs);
  expect(result).toBe(1);
});
describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];
  test("when list has only one blog, equals the likes of that", () => {
    const result = for_testing.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("calculate real db list total likes", async () => {
    const response = await axios.get("http://localhost:3003/api/blogs");
    const dbBlogs = response.data;
    const result = for_testing.totalLikes(dbBlogs);
    expect(result).toBe(36);
  }, 10000);
});

test("favorite blog", async () => {
  const response = await axios.get("http://localhost:3003/api/blogs");
  const allBlogs = response.data;
  const result = for_testing.favoriteBlog(allBlogs);
  expect(result).toEqual({
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  });
}, 30000);
test("most blogs bloger", async () => {
  const response = await axios.get("http://localhost:3003/api/blogs");
  const allBlogs = response.data;
  const result = for_testing.mostBlogs(allBlogs);
  expect(result).toEqual({
    author: "Robert C. Martin",
    blogs: 3,
  });
}, 30000);
test("most likes bloger", async () => {
  const response = await axios.get("http://localhost:3003/api/blogs");
  const allBlogs = response.data;
  const result = for_testing.mostLikes(allBlogs);
  expect(result).toEqual({
    author: "Edsger W. Dijkstra",
    likes: 17,
  });
}, 30000);