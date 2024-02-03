import mongoose from "mongoose";
import { NODE_ENV } from "./config";

console.log("NODE_ENV", String(NODE_ENV));

const mongoURI: string =
	String(NODE_ENV) == "PROD"
		? "mongodb+srv://adarshahalder02:Adarsha02@cluster0.xdh2nqr.mongodb.net/muslim_matrimony"
		: String(NODE_ENV) == "DEV"
		? "mongodb+srv://adarshahalder02:Adarsha02@cluster0.xdh2nqr.mongodb.net/muslim_matrimony"
		: String(NODE_ENV) == "LOCAL"
		? "mongodb+srv://adarshahalder02:Adarsha02@cluster0.xdh2nqr.mongodb.net/muslim_matrimony"
		: "";

console.log("First Connection", mongoURI);

const connectDb = async () => {
	try {
		if (mongoURI) {
			const conn = await mongoose.connect(mongoURI, {
				serverSelectionTimeoutMS: 40000
			});
			console.log("Second Connection -->", mongoURI);
			console.log(`\x1b[34m \x1b[1m \x1b[4mMongoDB Connected: ${conn.connection.port}\x1b[0m`);
		}
	} catch (err) {
		throw err;
	}
};
export default connectDb;
