const moongose = require("mongoose");

const JoinContactSchema = new moongose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    phoneTwo: {
      type: String,
      required: true,
    },
    phoneName: {
      type: String,
      required: true,
    },
    phoneTwoName: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = moongose.model("JoinContact", JoinContactSchema);
