require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
  cooldowns:{
    miniboss:{
		type:Date,
		default: 0,
	},
  dungeon:{
		type:Date,
		default: 0,
	},
  },
    hero: {
		inventory:{
      ["Small Healing Potion"]: {
        type: Number,
        default: 5,
      },
      ["Large Healing Potion"]: {
        type: Number,
        default: 0,
      },
      ["Enourmous Healing Potion"]: {
        type: Number,
        default: 0,
      },
      ["Quality Healing Potion"]: {
        type: Number,
        default: 0,
      },
      ["Mega Healing Potion"]: {
        type: Number,
        default: 0,
      },
      ["Ultra Healing Potion"]: {
        type: Number,
        default: 0,
      },
      ["Small Healing Salve"]: {
        type: Number,
        default: 0,
      },
      ["Large Healing Salve"]: {
        type: Number,
        default: 0,
      },
      Carrot:{
          type: Number,
          default: 0,
      }
		},
    }
}, { strict: false });

module.exports = mongoose.model("User", userSchema);