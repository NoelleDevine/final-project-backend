import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import trialRouter from "./routes/trialRouter";
import patientRouter from "./routes/patientRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", trialRouter);
app.use("/", patientRouter);
export const api = functions.https.onRequest(app);
