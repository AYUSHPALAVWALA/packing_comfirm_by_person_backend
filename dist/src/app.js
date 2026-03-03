"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _authRoutes = _interopRequireDefault(require("./modules/auth/auth.routes.js"));
var _packingRoutes = _interopRequireDefault(require("./modules/packing/packing.routes.js"));
var _errorMiddleware = _interopRequireDefault(require("./middlewares/error.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config(); //for .env file

const app = (0, _express.default)(); // create express server instance here are store in app variable

//middlewares
app.use(_express.default.json()); //middleware use to parses incoming JSON requests and makes data available in req.body
app.use(_express.default.urlencoded({
  extended: true
})); //middleware use to parses URL-encoded form data (HTML form submissions)
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)({
  origin: true,
  credentials: true
})); //middleware use to allows frontend (different port/domain) to access backend APIs

//routers
app.use("/api/auth", _authRoutes.default); // /api/auth is prefix compulsory used before router APIs
app.use("/api/quantity-entry", _packingRoutes.default);

// Error Middleware
app.use(_errorMiddleware.default);
var _default = exports.default = app;