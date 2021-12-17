const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const errorHandler = require("./error-handling/error-handler");
const ApiRouter = require("./routes/ApiRoute");

// mongo section
const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
mongoose.connect(mongoUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongoDB");
});
// mongo section
app.use(cors());
app.use(express.json());

app.use("/api", ApiRouter);

app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;