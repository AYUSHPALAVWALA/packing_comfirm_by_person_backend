"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _userModel = _interopRequireDefault(require("../modules/user/user.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Not authorized"
    });
  }
  try {
    const decoded = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await _userModel.default.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({
        message: "User not found"
      });
    }
    next();
  } catch (error) {
    console.error("Server failed :", error.message);
    return res.status(401).json({
      message: "Token failed"
    });
  }
};
var _default = exports.default = protect;