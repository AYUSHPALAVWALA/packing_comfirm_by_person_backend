"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var authService = _interopRequireWildcard(require("./auth.service.js"));
var _asyncHandler = _interopRequireDefault(require("../../utils/asyncHandler.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const registerUsers = (0, _asyncHandler.default)(async (req, res) => {
  const {
    username,
    email,
    password,
    role
  } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }
  const {
    user,
    token
  } = await authService.registerUser({
    username,
    email,
    password,
    role
  });
  res.status(201).json({
    message: "New user registered successfully.",
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role
    },
    token
  });
});
const loginUsers = (0, _asyncHandler.default)(async (req, res) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields required"
    });
  }
  const {
    user,
    token
  } = await authService.loginUser({
    email,
    password
  });
  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.username,
      role: user.role
    }
  });
});
const getUsers = (0, _asyncHandler.default)(async (req, res) => {
  const filter = req.query.role ? {
    role: req.query.role
  } : {};
  const users = await authService.getAllUsers(filter);
  res.json(users);
});
const getMe = (0, _asyncHandler.default)(async (req, res) => {
  res.json({
    user: req.user
  });
});
const deleteUser = (0, _asyncHandler.default)(async (req, res) => {
  const {
    id
  } = req.params;
  await authService.deleteUserById(id);
  res.json({
    message: "User deleted successfully"
  });
});
var _default = exports.default = {
  registerUsers,
  loginUsers,
  getUsers,
  getMe,
  deleteUser
};