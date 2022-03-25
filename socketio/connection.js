/**
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io -- socket.io state object
 * @description handles every socket connection to server
 */

const socket = (io) => {
  io.on("connection", () => {
    console.log("Client Connected");
  });
};

export { socket };
