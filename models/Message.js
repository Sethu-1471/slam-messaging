const moongose = require("mongoose");

const MessageSchema = new moongose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderNum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = moongose.model("Message", MessageSchema);
