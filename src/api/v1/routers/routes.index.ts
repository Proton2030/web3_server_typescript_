import express from "express";

const app = express();

app.use("/auth", require("./auth/auth.routes"));
app.use("/payment", require("./payment/payment.routes"));

module.exports = app;
