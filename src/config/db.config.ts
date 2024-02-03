import mongoose from "mongoose";
import { NODE_ENV } from "./config";

console.log("NODE_ENV", String(NODE_ENV));

const mongoURI: string =
	String(NODE_ENV) == "PROD"
		? "mongodb://127.0.0.1:27082/web3_db_prod"
		: String(NODE_ENV) == "DEV"
		? "mongodb://127.0.0.1:27082/web3_db_dev"
		: String(NODE_ENV) == "LOCAL"
		? "mongodb://127.0.0.1:27017/web3_db_local"
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
