"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const usersSchema = new _mongoose.default.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8
  },
  role: {
    type: String,
    enum: ["admin", "confirmer", "businessman"],
    required: true
  }
}, {
  timestamps: true
});
const usersModel = _mongoose.default.model("usersRegister", usersSchema);
var _default = exports.default = usersModel;