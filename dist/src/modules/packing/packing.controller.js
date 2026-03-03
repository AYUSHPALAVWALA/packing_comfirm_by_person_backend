"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var packingService = _interopRequireWildcard(require("./packing.service.js"));
var packingAnalytics = _interopRequireWildcard(require("./packing.analytics.js"));
var _asyncHandler = _interopRequireDefault(require("../../utils/asyncHandler.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const buildDateFilter = query => {
  let filter = {};
  if (query.month) {
    const [year, month] = query.month.split('-');
    const startDate = new Date(Date.UTC(year, parseInt(month) - 1, 1));
    const endDate = new Date(Date.UTC(year, parseInt(month), 1));
    filter.parcel_date_time = {
      $gte: startDate,
      $lt: endDate
    };
  } else if (query.year) {
    const startDate = new Date(Date.UTC(query.year, 0, 1));
    const endDate = new Date(Date.UTC(parseInt(query.year) + 1, 0, 1));
    filter.parcel_date_time = {
      $gte: startDate,
      $lt: endDate
    };
  } else if (query.date) {
    const [year, month, day] = query.date.split('-');
    const startDate = new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day)));
    const endDate = new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day) + 1));
    filter.parcel_date_time = {
      $gte: startDate,
      $lt: endDate
    };
  }
  return filter;
};
const createPackingEntry = (0, _asyncHandler.default)(async (req, res) => {
  const {
    quantity,
    businessman_name
  } = req.body;
  if (!quantity || !businessman_name) {
    return res.status(400).json({
      message: "All are required."
    });
  }
  const newEntry = await packingService.createEntry({
    packing_confirm_by_name: req.user._id,
    quantity,
    businessman_name,
    parcel_date_time: new Date()
  });
  res.status(201).json({
    message: "Packing entry created successfully.",
    newEntry
  });
});
const getPackingEntries = (0, _asyncHandler.default)(async (req, res) => {
  const fetchEntries = await packingService.getEntries({
    packing_confirm_by_name: req.user._id
  });
  res.json(fetchEntries);
});
const updatePackingEntries = (0, _asyncHandler.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    quantity
  } = req.body;
  const packingEntry = await packingService.updateEntry(id, req.user._id, {
    quantity
  });
  res.json({
    message: "Entry updated :",
    packingEntry
  });
});
const deletePackingEnteris = (0, _asyncHandler.default)(async (req, res) => {
  const {
    id
  } = req.params;
  await packingService.deleteEntry(id, req.user._id);
  res.json({
    message: "Entry deleted successfully."
  });
});
const getPackingEntriesInBusinessman = (0, _asyncHandler.default)(async (req, res) => {
  const filter = buildDateFilter(req.query);
  const packingEntries = await packingService.getEntries({
    businessman_name: req.user._id,
    ...filter
  });
  res.json(packingEntries);
});
const updatePackingEntriesInBusiness = (0, _asyncHandler.default)(async (req, res) => {
  const {
    id
  } = req.params;
  const {
    quantity
  } = req.body;
  const packingEntry = await packingService.updateEntry(id, req.user._id, {
    quantity
  });
  res.json({
    message: "Entry updated :",
    packingEntry
  });
});
const deletePackingEnterisInBusiness = (0, _asyncHandler.default)(async (req, res) => {
  const {
    id
  } = req.params;
  await packingService.deleteEntry(id, req.user._id);
  res.json({
    message: "Entry deleted successfully."
  });
});
const getAllEnteries = (0, _asyncHandler.default)(async (req, res) => {
  const filter = buildDateFilter(req.query);
  const packingEntries = await packingService.getEntries(filter);
  res.json(packingEntries);
});

// Analytics Route
const getDashboardStats = (0, _asyncHandler.default)(async (req, res) => {
  const stats = await packingAnalytics.getRoleDashboardStats(req.user._id, req.user.role);
  res.json(stats);
});
var _default = exports.default = {
  createPackingEntry,
  getPackingEntries,
  updatePackingEntries,
  deletePackingEnteris,
  getPackingEntriesInBusinessman,
  updatePackingEntriesInBusiness,
  deletePackingEnterisInBusiness,
  getAllEnteries,
  getDashboardStats
};