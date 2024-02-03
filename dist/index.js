"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const db_config_1 = __importDefault(require("./config/db.config"));
const mongo_url = (process.env.NODE_ENV !== "PROD") ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL;
// dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8989;
// const mongo_url = (process.env.NODE_ENV !== "PROD") ? process.env.LOCAL_MONGO_URL : process.env.PROD_MONGO_URL
const options = {
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
app.use((0, cors_1.default)(options));
app.use((0, body_parser_1.json)());
app.get("/", (req, res) => {
    res.send(`<h1>sent succesfully</h1>`);
});
app.use("/api/v1", require("./api/v1/routers/routes.index"));
(0, db_config_1.default)();
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
