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
import cron from "node-cron"
import { setMiningBalance } from "./services/setMiningBalance/setMininigBalance.service";
import axios from "axios";


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

app.use(express.json());

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

app.get('/api/coinmarketcap', async (req, res) => {
  try {
    const response = await axios.get('https://api.coinmarketcap.com/dexer/v3/dexer/pair-info', {
      params: {
        'dexer-platform-name': 'polygon',
        'address': '0xf58c22ff037978f98ef9c808f84c814866bde208',
        't': 170765149069
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get("/", (req, res) => {

  res.send(
    `<h1>sentss succesfully</h1>`
  )
});

app.use("/api/v1", require("./api/v1/routers/routes.index"));


connectDb();

cron.schedule('*/15 * * * *', setMiningBalance);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

