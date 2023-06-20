import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import trialRouter from "./routes/trialRouter";
import patientRouter from "./routes/patientRouter";
import reactionRouter from "./routes/reactionRouter";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", trialRouter);
app.use("/", patientRouter);
app.use("/", reactionRouter);
export const api = functions.https.onRequest(app);
