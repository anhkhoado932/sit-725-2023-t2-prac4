require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

var app = express();
var port = process.env.port || 3000;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/cat", async (req, res) => {
  await client.connect();
  const catCollection = client.db().collection("cats");
  catCollection.find({}).toArray((err, res) => {
    if (!err) {
      res
        .status(200)
        .json({ statusCode: 200, data: result, message: "success" });
    } else {
      res.status(400).json({ s });
    }
    client.close();
  });
});

app.post("/cat", async (req, res) => {
  await client.connect();

  const catCollection = client.db().collection("cats");
  catCollection.insertOne(req.body, (err, result) => {
    if (!err) {
      res.status(201).json({ data: result, message: "success" });
    } else {
      res.status(400).json({ message: result });
    }
    client.close();
  });
});

async function testRunDB() {
  try {
    await client.connect();
    console.log("Database connection works!");
  } finally {
    await client.close();
  }
}

app.listen(port, () => {
  console.log("App listening to: " + port);
  testRunDB().catch(console.dir);
});
