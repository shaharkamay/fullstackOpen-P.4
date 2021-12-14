const mongoose = require("mongoose");
const Blog = require("../models/blogSchema");
const supertest = require("supertest");
const app = require("../app");
require('dotenv').config();
const { getAllBlogs } = require("../controllers/blogController");

const api = supertest(app);

let id = '';
let token = "bearer " + process.env.TEST_TOKEN;

test("blogs are returned as json", async () => {
  const dbBlogs = await Blog.find();
  const result = await api
    .get("/api/blogs")
    .set('Authorization', token)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(result.body.length).toBe(dbBlogs.length);
});

test("verify that the unique identifier property of the blog posts is named id", async () => {
  const result = await api
    .get("/api/blogs")
    .set('Authorization', token)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  expect(result.body[0].id).toBeDefined();
})

test("verify that a blog added to DB", async () => {
  const blogs1 = await api
    .get("/api/blogs")
    .set('Authorization', token)

  const res = await api.post("/api/blogs")
    .set('Authorization', token)
    .send({
      "title": "test",
      "author": "test",
      "url": "test",
      "likes": 0,
    })

  const blogs2 = await api
    .get("/api/blogs")
    .set('Authorization', token)

  expect(blogs1.body.length + 1).toBe(blogs2.body.length);

  id = res.body.id;
})

test("verifies that a new blog without liked gets likes prop", async () => {
  const response = await api.post("/api/blogs")
    .set('Authorization', token)
    .send({
      title: "test5",
      author: "test5",
      url: "test5",
    });

  expect(response.body.likes).toBe(0);
});

test("verifies that a blog without a title or a url returns status 400 ERROR", async () => {
  const response = await api
    .post("/api/blogs")
    .set('Authorization', token)
    .send({
      author: "test5",
      likes: 5,
    })
    .expect(400);
});

test("verify that a chosen blog deleted from DB", async () => {
  const blogs1 = await api
    .get("/api/blogs")
    .set('Authorization', token);

  await api.delete(`/api/blogs/${id}`)
    .set('Authorization', token);

  const blogs2 = await api
    .get("/api/blogs")
    .set('Authorization', token);
  expect(blogs1.body.length - 1).toBe(blogs2.body.length);
});

test("should update correctly likes of a blog", async () => {
  const response = await api
    .put("/api/blogs/update")
    .set('Authorization', token)
    .send({ _id: "61b79e0640bcc72c3f8a4d3e", likes: "141" })
    .expect(200)
  expect(response.body.likes).toBe(141);
}, 10000);



afterAll(() => {
  mongoose.connection.close();
});
