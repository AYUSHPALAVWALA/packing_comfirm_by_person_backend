"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _packingController = _interopRequireDefault(require("./packing.controller.js"));
var _authMiddleware = _interopRequireDefault(require("../../middlewares/auth.middleware.js"));
var _roleMiddleware = _interopRequireDefault(require("../../middlewares/role.middleware.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();

// Confirmer: create entry
router.post("/create-packing-entries", _authMiddleware.default, (0, _roleMiddleware.default)("confirmer"), _packingController.default.createPackingEntry);

// Confirmer: get own entries
router.get("/get-packing-entries", _authMiddleware.default, (0, _roleMiddleware.default)("confirmer"), _packingController.default.getPackingEntries);

// Confirmer: update own entry
router.patch("/update-packing-entries/:id", _authMiddleware.default, (0, _roleMiddleware.default)("confirmer"), _packingController.default.updatePackingEntries);

// Confirmer: delete own entry
router.delete("/delete-packing-entries/:id", _authMiddleware.default, (0, _roleMiddleware.default)("confirmer"), _packingController.default.deletePackingEnteris);

// Businessman: get entries assigned to them
router.get("/get-businessman-entries", _authMiddleware.default, (0, _roleMiddleware.default)("businessman"), _packingController.default.getPackingEntriesInBusinessman);

// Businessman: update entry assigned to them
router.patch("/update-businessman-entries/:id", _authMiddleware.default, (0, _roleMiddleware.default)("businessman"), _packingController.default.updatePackingEntriesInBusiness);

// Businessman: delete entry assigned to them
router.delete("/delete-businessman-entries/:id", _authMiddleware.default, (0, _roleMiddleware.default)("businessman"), _packingController.default.deletePackingEnterisInBusiness);

// Admin: get ALL entries
router.get("/get-all-entries", _authMiddleware.default, (0, _roleMiddleware.default)("admin"), _packingController.default.getAllEnteries);

// Shared: get dashboard stats
router.get("/dashboard-stats", _authMiddleware.default, _packingController.default.getDashboardStats);
var _default = exports.default = router;