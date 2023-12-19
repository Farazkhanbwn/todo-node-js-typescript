import { Express } from "express";
import route from "./todo/todo-routes";
import userRoute from "./user/user-routes";

const express = require("express");
const cors = require("cors");
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/todo", route);
app.use("/user", userRoute);

export default app;
