import * as dotenv from "dotenv";
import { connectToMongoDb } from "./config/db";
import http from "http";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

async function initNodeJsApplication() {
  try {
    await connectToMongoDb();

    server.listen(port, () => {
      console.log(`${port} is Running`);
    });
  } catch (error) {
    console.log("error");
  }
}

initNodeJsApplication();
