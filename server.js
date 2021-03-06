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
import conversationRouter from "./routes/conversation.js";
import doctorRouter from "./routes/doctor.js";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import testimonialRouter from "./routes/testimonial.js";
import specialityRouter from "./routes/specialities.js";
import medicineRouter from "./routes/medicine.js";
import appointmentRouter from "./routes/appointment.js";
import diseaseRouter from "./routes/diseases.js";

import { createServer } from "node:http";
import { Server } from "socket.io";

import { socket } from "./socketio/connection.js";
import checkSocket from "./middlewares/socket.js";

import { initializePassport } from "./utils/passport.js";
initializePassport();

import { setBucket } from "./config/storage.js";
setBucket();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const sessionMiddleware = cookieSession({
  maxAge: 1000 * 60 * 60 * 24 * 30,
  keys: [process.env.SECRET],
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
  .use(sessionMiddleware)
  .use(passport.initialize())
  .use(passport.session());

//-----------------ROUTERS--------------------------

app.get("/api/v1/hi", (req, res) => {
  console.log(req.user);
  res.send("Hi");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/conversation", conversationRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/doctor", doctorRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/testimonial", testimonialRouter);
app.use("/api/v1/speciality", specialityRouter);
app.use("/api/v1/medicine", medicineRouter);
app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/disease", diseaseRouter);

//-----------------SOCKET IO------------------------

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

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
