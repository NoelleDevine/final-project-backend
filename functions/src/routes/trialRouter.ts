import express from "express";
import { getClient } from "../db";
import Trial from "../models/Trial";
import { ObjectId } from "mongodb";

const trialRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

trialRouter.get("/allTrials", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Trial>("trials").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

trialRouter.get("/allTrials/trials/:guardian", async (req, res) => {
  const guardianToFind: string = req.params.guardian;

  try {
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Trial>("trials")
      .find({ guardianID: guardianToFind });
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

trialRouter.get("/trials/:id", async (req, res) => {
  const trialToFind: string = req.params.id;
  try {
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Trial>("trials")
      .find({ patient_id: trialToFind });
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

trialRouter.post("/addTrial", async (req, res) => {
  const newTrial: Trial = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Trial>("trials").insertOne(newTrial);
    res.status(201).json(newTrial);
  } catch (err) {
    errorResponse(err, res);
  }
});

trialRouter.delete("/trials/:id", async (req, res) => {
  const idToDelete: ObjectId = new ObjectId(req.params.id);
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Trial>("trials")
      .deleteOne({ _id: idToDelete });
    if (result.deletedCount > 0) {
      res.sendStatus(204);
    } else {
      res.status(404).json("Id not found");
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

trialRouter.put("/trials/:id", async (req, res) => {
  // path param point to the obj to replace
  const idToReplace: string = req.params.id;
  // this will replace that obj from ^^
  const updatedTrial: Trial = req.body;
  // delete _id because we're using replace one in API
  delete updatedTrial._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Trial>("trials")
      .replaceOne({ _id: new ObjectId(idToReplace) }, updatedTrial);
    if (result.modifiedCount > 0) {
      updatedTrial._id = new ObjectId(idToReplace);
      res.status(200).json(updatedTrial);
    } else {
      res.status(404).json({ message: "_id not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default trialRouter;
