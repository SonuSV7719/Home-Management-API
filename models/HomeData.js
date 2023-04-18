var mongoose = require("mongoose");

const homeDataSchema = new mongoose.Schema(
  {
    noOfLedGlowing: { type: String, default : "" },
    noOfPeopleInRoom: { type: String, default : "" },
  },{
    timestamps : true
  }
);

const Homedata = mongoose.models.Homedata || mongoose.model('Homedata', homeDataSchema);
module.exports = { Homedata };
