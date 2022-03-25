import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

import { createServer } from "node:http";
import { Server } from "socket.io";

import { socket } from "./socketio/connection.js";
import checkSocket from "./middlewares/socket.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    fileUpload({
      limits: 10 * 1024 * 1024, //10MB
    })
  );

//-----------------ROUTERS--------------------------

//-----------------SOCKET IO------------------------

io.use(checkSocket);
socket(io); // Socket Connection

//-----------------APP------------------------------

mongoose.connect(process.env.MONGO_URI, (e) => {
  console.log(e ? e : "DB Connected");
});

httpServer.listen(process.env.PORT, () => {
  console.log(
    `Server is running in mode ${process.env.NODE_ENV} on port ${process.env.PORT}`
  );
});
