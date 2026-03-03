"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("./auth.controller.js"));
var _authMiddleware = _interopRequireDefault(require("../../middlewares/auth.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post("/register-users", _authController.default.registerUsers);
router.post("/login-users", _authController.default.loginUsers);
router.get("/users", _authMiddleware.default, _authController.default.getUsers);
router.get("/me", _authMiddleware.default, _authController.default.getMe);
router.delete("/users/:id", _authMiddleware.default, _authController.default.deleteUser);
var _default = exports.default = router;