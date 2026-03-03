"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const packingSchema = new _mongoose.default.Schema({
  packing_confirm_by_name: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "usersRegister",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  businessman_name: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "usersRegister",
    required: true
  },
  parcel_date_time: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
const packingModel = _mongoose.default.model("packingEntries", packingSchema);
var _default = exports.default = packingModel;