const User = require("./models/User");
const JoinContact = require("./models/JoinContact");
const Message = require("./models/Message");

const sockets = (io) => {
  io.on("connection", (socket) => {
    // Log a new user connected
    console.log(`user Connected ${socket.id}`);
    socket.on("saveUserSocket", async (room) => {
      console.log(`${socket.id} Updating Socket Id`);
      let updated = await User.findOneAndUpdate(
        { _id: room._id },
        { socket: socket.id },
        {
          new: true,
        }
      );
      if (!updated) {
        console.log("err");
      } else {
        console.log("Success saved Socket Id");
        let list = await JoinContact.find({
          $or: [{ phone: updated.contact }, { phoneTwo: updated.contact }],
        });

        socket.emit("firstCall", { status: true, data: list });
      }
      // socket.join(room);
    });

    socket.on("search", async ({ phone, channelName, phoneName }) => {
      try {
        if (phone == channelName) throw { message: "Same as Your Number" };
        let user = await User.findOne({ contact: channelName });
        if (!user) throw { message: "User Not Found" };
        let check = await JoinContact.findOne({
          $or: [
            { $and: [{ phone: channelName }, { phoneTwo: phone }] },
            { $and: [{ phone: phone }, { phoneTwo: channelName }] },
          ],
        });
        if (check) throw { message: "Already Chat Found", data: check._id };
        let newList = new JoinContact({
          phone: phone,
          phoneTwo: user.contact,
          phoneName: phoneName,
          phoneTwoName: user.name,
        });
        await newList.save();
        socket.emit("addNewChat", { status: true, data: newList });
      } catch (error) {
        console.log("[ERROR] in search", error.message);
        socket.emit("error", {
          status: false,
          message: error.message,
          data: error.data && error.data,
        });
      }
    });

    socket.on("getMessage", async (id) => {
      let messages = await Message.find({ roomId: id });
      socket.emit("recieveMessage", { status: true, data: messages });
    });

    socket.on(
      "messageSend",
      async ({ message, senderName, senderNum, roomId, recieverNumber }) => {
        let newMessage = new Message({
          message,
          senderName,
          senderNum,
          roomId,
        });
        await newMessage.save();
        let user = await User.findOne({ contact: recieverNumber });
        let messages = await Message.find({ roomId: roomId });
        console.log(user.socket, "sid")
        socket.broadcast
          .to(user.socket)
          .emit("recieveMessage", { status: true, data: messages });
        socket.emit("recieveMessage", { status: true, data: messages, roomId: roomId });
      }
    );

    socket.on("disconnect", async () => {
      console.log("user disconnected: " + socket.id);
      let updated = await User.findOneAndUpdate(
        { socket: socket.id },
        { socket: null },
        {
          new: true,
        }
      );
      if (!updated) {
        console.log("err");
      } else {
        console.log("Success removed Socket Id");
      }
    });
  });
};

module.exports = { sockets };
