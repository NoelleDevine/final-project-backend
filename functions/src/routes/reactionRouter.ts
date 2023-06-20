import express from "express";
import { getClient } from "../db";
import Reaction from "../models/Reaction";

const reactionRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

//add new reaction to collection

reactionRouter.post("/addReaction", async (req, res) => {
  console.log("got to backend");
  const newReaction: Reaction = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Reaction>("reactions").insertOne(newReaction);
    res.status(201).json(newReaction);
  } catch (err) {
    errorResponse(err, res);
  }
});

//get all reactions by TRIAL ID
reactionRouter.get("/reactions/:TrialId", async (req, res) => {
  const trialToFind: string = req.params.TrialId;
  try {
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Reaction>("reactions")
      .find({ trial_id: trialToFind });
    const result = await cursor.toArray();
    res.json(result);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default reactionRouter;
