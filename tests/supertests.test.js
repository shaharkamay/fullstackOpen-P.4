const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
// const getAllPosts = require("../controllers/ApiController");
const { getAllBlogs } = require("../controllers/ApiController");

const api = supertest(app);

test("blogs are returned as json", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(result.body.length).toBe(6);
});

test("verify that the unique identifier property of the blog posts is named id", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(result.body[0].id).toBeDefined();
})

afterAll(() => {
  mongoose.connection.close();
});
