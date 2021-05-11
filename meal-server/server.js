const express = require("express");
const cors = require("cors");
const meals = require("./search.js");
const history = require("./history.js");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

app.use("", meals);

// /history
app.use("/history", history);

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;
const client = new MongoClient(uri, { useUnifiedTopology: true });

client.connect((err) => {
  if (err) {
    throw new Error("Failed to connect to MongoDb");
  }

  console.log("Connected successfully to Mongo");

  app.locals.db = client.db();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
