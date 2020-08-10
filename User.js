require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const Schema = mongoose.Schema;

const userSchema = new Schema({
    hero: {
		inventory:{
            Carrots:{
                type: Number,
                default: 0,
            }
		},
    }
}, { strict: false });

module.exports = mongoose.model("User", userSchema);