// import { getAuth } from "firebase-admin/auth";
// import { app } from "../config/firebase.js";

const checkSocket = async (socket, next) => {
  // const sessionCookie = socket?.handshake?.auth?.session;

  try {
    //! await getAuth(app).verifySessionCookie(sessionCookie, true);
    next();
  } catch (error) {
    next(error);
  }
};

export default checkSocket;
