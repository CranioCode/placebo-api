let users = {};

/**
 * @param {Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>} io -- socket.io state object
 * @description handles every socket connection to server
 */

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log(socket.request.user);
    const uid = socket?.request?.user._id;
    users[uid] = socket.id;
    socket.on("sendMessage", (message) => {
      io.to(users[message.receiver]).emit("receiveMessage", message);
    });
    socket.on("disconnect", () => {
      delete users[uid];
    });
  });
};

export { socket };
