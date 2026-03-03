"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./src/app.js"));
var _db = _interopRequireDefault(require("./src/config/db.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const PORT = process.env.PORT;

// connectDB() called here, and database connect first, and then start server
(0, _db.default)().then(() => {
  _app.default.listen(PORT, () => {
    console.log(`Server running on port : http://localhost:${PORT}`);
  });
}).catch(error => {
  console.error("Database connection Failed :", error);
  process.exit(1);
});
