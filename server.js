import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

import cors from "cors";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import passport from "passport";
import cookieSession from "cookie-session";

import authRouter from "./routes/auth.js";
import doctorRouter from "./routes/doctor.js";
import userRouter from "./routes/user.js";

import { createServer } from "node:http";
import { Server } from "socket.io";

import { socket } from "./socketio/connection.js";
import checkSocket from "./middlewares/socket.js";

import { initializePassport } from "./utils/passport.js";
initializePassport();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app
  .use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  )
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser())
  .use(
    fileUpload({
      limits: 10 * 1024 * 1024, //10MB
    })
  )
  .use(
    cookieSession({
      maxAge: 1000 * 60 * 60 * 24 * 30,
      keys: [process.env.SECRET],
    })
  )
  .use(passport.initialize())
  .use(passport.session());

//-----------------ROUTERS--------------------------

app.use("/api/v1/auth", authRouter);

// TODO: Add authentication check
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);

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
