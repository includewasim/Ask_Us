const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save", async (req, res) => {
    const url = "mongodb+srv://wasimkhanzabi222:Wasim%40786@cluster0.yzweypi.mongodb.net/doubt-app?retryWrites=true&w=majority";
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        const db = client.db("doubt-app");
        const coll = db.collection("doubt");
        const record = {
            name: req.body.name,
            contact: req.body.contact,
            doubt: req.body.doubt,
        };

        // Insert the record into the collection
        const result = await coll.insertOne(record);
        res.send(result);
    } catch (error) {
        console.error("Error inserting record:", error);
        res.status(500).send({ error: "Internal Server Error" });
    } finally {
        // Ensure client is closed in all scenarios
        await client.close();
    }
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
