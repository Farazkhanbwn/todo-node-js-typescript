import { Express } from "express";
import route from "./todo/todo-routes";
import userRoute from "./user/user-routes";

import express from "express";
import cors from "cors";
const app: Express = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"], // Add the allowed HTTP methods
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/todo", route);
app.use("/user", userRoute);

export default app;
