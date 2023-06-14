import express from "express";
import { getClient } from "../db";
import Trial from "../models/Trial";

const trialRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};
trialRouter.get("/trials", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Trial>("trials").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});
export default trialRouter;
