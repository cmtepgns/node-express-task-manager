const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require('./middleware/not-found')


// middleware to have the data in the req.body
app.use(express.json());

// middleware
app.use(express.static("./public"));

// import routers
const tasks = require("./routes/tasks");

// defining root routes for all routes from tasks.js
app.use("/api/v1/tasks", tasks);

// middleware to handle the 404
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch {
    console.log(error);
  }
};

start();
