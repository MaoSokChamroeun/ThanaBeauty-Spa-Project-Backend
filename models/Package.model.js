const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: {
    kh: { type: String, required: true },
    en: { type: String, required: true },
    ch: { type: String },
  },
  image: {
    type: String,
  },
  description: {
    kh: { type: String, required: true },
    en: { type: String, required: true },
    ch: { type: String },
  },
});

const Packages = mongoose.model("Packages", packageSchema);
module.exports = Packages;
