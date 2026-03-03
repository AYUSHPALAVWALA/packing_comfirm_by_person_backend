"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const generateToken = (id, role) => {
  return _jsonwebtoken.default.sign({
    id,
    role
  }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d"
  });
};
var _default = exports.default = generateToken;