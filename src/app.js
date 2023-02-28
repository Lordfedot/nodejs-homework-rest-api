const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { errorHadler } = require("./helpers/apiHelpers");
const { contactsRouter } = require("./api/contactsRouter");
const { authRouter } = require("./api/authRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth/users", authRouter);
app.use("/api/contacts", contactsRouter);



app.use(errorHadler);

module.exports = app;
