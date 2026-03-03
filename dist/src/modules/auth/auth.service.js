"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.loginUser = exports.getUserById = exports.getAllUsers = exports.deleteUserById = void 0;
var _userModel = _interopRequireDefault(require("../user/user.model.js"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _generateToken = _interopRequireDefault(require("../../utils/generateToken.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const registerUser = async ({
  username,
  email,
  password,
  role
}) => {
  const isUserAlreadyExists = await _userModel.default.findOne({
    email
  });
  if (isUserAlreadyExists) {
    throw new Error("Email already exists");
  }
  const hashedpassword = await _bcrypt.default.hash(password, 12);
  const user = await _userModel.default.create({
    username,
    email,
    password: hashedpassword,
    role: role || "businessman"
  });
  const token = (0, _generateToken.default)(user._id, user.role);
  return {
    user,
    token
  };
};
exports.registerUser = registerUser;
const loginUser = async ({
  email,
  password
}) => {
  const user = await _userModel.default.findOne({
    email
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isMatch = await _bcrypt.default.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  const token = (0, _generateToken.default)(user._id, user.role);
  return {
    user,
    token
  };
};
exports.loginUser = loginUser;
const getAllUsers = async (filter = {}) => {
  return await _userModel.default.find(filter).select("-password");
};
exports.getAllUsers = getAllUsers;
const getUserById = async id => {
  return await _userModel.default.findById(id).select("-password");
};
exports.getUserById = getUserById;
const deleteUserById = async id => {
  return await _userModel.default.findByIdAndDelete(id);
};
exports.deleteUserById = deleteUserById;