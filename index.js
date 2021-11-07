const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const uri =
  "mongodb+srv://hasan:cscMwm4s3tc9rvv7@cluster0.oisx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //   client.close();
});

async function run() {
  try {
    await client.connect();
    const database = client.db("proxy_Gym");
    const gym_Trainer = database.collection("gym_Trainer");
    const price = database.collection("price");

    app.get("/trainers", async (req, res) => {
      const query = {};

      const cursor = gym_Trainer.find(query);

      const result = await cursor.toArray();

      res.json(result);
    });
    app.get("/bestPrice", async (req, res) => {
      const query = {};

      const cursor = price.find(query);

      const result = await cursor.toArray();

      res.json(result);
    });
    // bookin api
    app.get("/booking/:id", async (req, res) => {
      const query = req.params.id;

      const result = await price.findOne({ _id: ObjectId(query) });
      console.log(result);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("hello! iam fitness server running:");
});
app.listen(port, () => {
  console.log("fitness server running at", port);
});
