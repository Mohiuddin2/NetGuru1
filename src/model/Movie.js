const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  Title: {
    type: String,
    required: true,
    unique: true,
  },
  Released: {
    type: Date,
    required: true,
  },
  Genre: {
    type: String,
    requierd: true,
  },
  Director: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);


