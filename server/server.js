const express = require("express");
const cors= require("cors");
const { MongoClient }=require("mongodb");

const app=express();
app.use(cors());
app.use(express.json());

app.post("/save",(req,res)=>{
    const url="mongodb://0.0.0.0:27017";
    const client= new MongoClient(url);
    const db=client.db("doubt-task");
    const coll=db.collection("Doubts");
    const record={"name":req.body.name,"contact":req.body.contact,"doubt":req.body.doubt};
    coll.insertOne(record)
    .then(result=>res.send(result))
    .catch(error=>res.send(error));
});
app.listen(9000, ()=>{console.log("Ready @ 9000");});
