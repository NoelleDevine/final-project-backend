import express from "express";
import { getClient } from "../db";
import Patient from "../models/Patient";
import { ObjectId } from "mongodb";

const patientRouter = express.Router();
const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

patientRouter.get("/allpatients", async (req, res) => {
  try {
    const client = await getClient();
    const cursor = client.db().collection<Patient>("patient").find();
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

patientRouter.get("/allPatients/:id", async (req, res) => {
  const patientToFind: string = req.params.id;

  try {
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Patient>("patient")
      .find({ patient_id: patientToFind });
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});
patientRouter.get("/allPatients/guardian/:guardian", async (req, res) => {
  const guardianToFind: string = req.params.guardian;

  try {
    const client = await getClient();
    const cursor = client
      .db()
      .collection<Patient>("patient")
      .find({ guardianID: guardianToFind });
    const results = await cursor.toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

patientRouter.post("/patient", async (req, res) => {
  const newPatient: Patient = req.body;
  try {
    const client = await getClient();
    await client.db().collection<Patient>("patient").insertOne(newPatient);
    res.status(201).json(newPatient);
  } catch (err) {
    errorResponse(err, res);
  }
});

patientRouter.delete("/patient/:id", async (req, res) => {
  const idToDelete: ObjectId = new ObjectId(req.params.id);
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Patient>("patient")
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

patientRouter.put("/patient/:id", async (req, res) => {
  // path param point to the obj to replace
  const idToReplace: string = req.params.id;
  // this will replace that obj from ^^
  const updatedPatient: Patient = req.body;
  // delete _id because we're using replace one in API
  delete updatedPatient._id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Patient>("patient")
      .replaceOne({ _id: new ObjectId(idToReplace) }, updatedPatient);
    if (result.modifiedCount > 0) {
      updatedPatient._id = new ObjectId(idToReplace);
      res.status(200).json(updatedPatient);
    } else {
      res.status(404).json({ message: "_id not found" });
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default patientRouter;
