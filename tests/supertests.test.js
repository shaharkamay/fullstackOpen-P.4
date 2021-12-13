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

  expect(result.body.length).toBe(11);
});

test("verify that the unique identifier property of the blog posts is named id", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(result.body[0].id).toBeDefined();
})

test("verify that a blog added to DB", async () => {
  const blogs1 = await api
    .get("/api/blogs")

  await api.post("/api/blogs").send({
    "title": "test",
    "author": "test",
    "url": "test",
    "likes": 0,
  }).expect(200)

  const blogs2 = await api
    .get("/api/blogs")

  expect(blogs1.body.length + 1).toBe(blogs2.body.length);
})

afterAll(() => {
  mongoose.connection.close();
});
