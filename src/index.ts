import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import http from "http";
import { Server, Socket } from "socket.io";
import connectDb from "./config/db.config";
import { userGraph } from "./services/reff/useGraph";
import { updateUserMiningStatus } from "./api/v1/controllers/mining";


const mongo_url = (process.env.NODE_ENV !== "PROD") ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL


// dotenv.config();
const app = express();

const port = process.env.PORT || 8989;

// const mongo_url = (process.env.NODE_ENV !== "PROD") ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL

const options: cors.CorsOptions = {
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false
};

app.use(cors(options));
app.use(json());

// Middleware to parse JSON in the request body
app.use(express.json());

// API route to add a user
app.post("/api/user", async (req: Request, res: Response) => {
  const { user_id, referralCode, referredBy } = req.body;

  try {
    const newUserInstance = await userGraph.addUser(user_id, referralCode, referredBy);

    res.status(200).json({
      message: "User Registration Done!",
      result: newUserInstance,
    });
  } catch (error) {
    console.error(error);

    if (error === "User with this referral code is already registered.") {
      return res.status(409).json({
        message: "User is already registered!",
      });
    }

    res.status(422).json({
      message: "Fail",
      error,
    });
  }
});

// API route to get user information by referral code
app.get("/api/user/:referralCode", async (req: Request, res: Response) => {
  const { referralCode } = req.params;

  try {
    const userInfo = await userGraph.getUserByReferralCode(referralCode);

    if (userInfo) {
      res.status(200).json(userInfo);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// API route to get level users
app.get("/api/levelUsers/:referralCode/:numLevels", async (req: Request, res: Response) => {
  const { referralCode, numLevels } = req.params;

  try {
    const levelUsers = await userGraph.getLevelUsers(referralCode, parseInt(numLevels, 10));

    res.status(200).json(levelUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.put('/update-mining-status/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Call the function to update the user's mining status
    await updateUserMiningStatus(userId);

    // Respond with a success message
    res.status(200).json({ message: `User with user_id ${userId} updated successfully` });
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/", (req, res) => {

  res.send(
    `<h1>sentss succesfully</h1>`
  )
});

app.use("/api/v1", require("./api/v1/routers/routes.index"));


connectDb()

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

