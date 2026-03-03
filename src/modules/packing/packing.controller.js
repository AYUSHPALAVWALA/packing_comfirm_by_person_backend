import * as packingService from "./packing.service.js";
import * as packingAnalytics from "./packing.analytics.js";
import asyncHandler from "../../utils/asyncHandler.js";

const buildDateFilter = (query) => {
  let filter = {};
  if (query.month) {
    const [year, month] = query.month.split('-');
    const startDate = new Date(Date.UTC(year, parseInt(month) - 1, 1));
    const endDate = new Date(Date.UTC(year, parseInt(month), 1));
    filter.parcel_date_time = { $gte: startDate, $lt: endDate };
  } else if (query.year) {
    const startDate = new Date(Date.UTC(query.year, 0, 1));
    const endDate = new Date(Date.UTC(parseInt(query.year) + 1, 0, 1));
    filter.parcel_date_time = { $gte: startDate, $lt: endDate };
  } else if (query.date) {
    const [year, month, day] = query.date.split('-');
    const startDate = new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day)));
    const endDate = new Date(Date.UTC(year, parseInt(month) - 1, parseInt(day) + 1));
    filter.parcel_date_time = { $gte: startDate, $lt: endDate };
  }
  return filter;
};

const createPackingEntry = asyncHandler(async (req, res) => {
  const { quantity, businessman_name } = req.body;

  if (!quantity || !businessman_name) {
    return res.status(400).json({ message: "All are required." });
  }

  const newEntry = await packingService.createEntry({
    packing_confirm_by_name: req.user._id,
    quantity,
    businessman_name,
    parcel_date_time: new Date(),
  });

  res.status(201).json({ message: "Packing entry created successfully.", newEntry });
});

const getPackingEntries = asyncHandler(async (req, res) => {
  const fetchEntries = await packingService.getEntries({ packing_confirm_by_name: req.user._id });
  res.json(fetchEntries);
});

const updatePackingEntries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const packingEntry = await packingService.updateEntry(id, req.user._id, { quantity });
  res.json({ message: "Entry updated :", packingEntry });
});

const deletePackingEnteris = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await packingService.deleteEntry(id, req.user._id);
  res.json({ message: "Entry deleted successfully." });
});

const getPackingEntriesInBusinessman = asyncHandler(async (req, res) => {
  const filter = buildDateFilter(req.query);
  const packingEntries = await packingService.getEntries({ businessman_name: req.user._id, ...filter });
  res.json(packingEntries);
});

const updatePackingEntriesInBusiness = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const packingEntry = await packingService.updateEntry(id, req.user._id, { quantity });
  res.json({ message: "Entry updated :", packingEntry });
});

const deletePackingEnterisInBusiness = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await packingService.deleteEntry(id, req.user._id);
  res.json({ message: "Entry deleted successfully." });
});

const getAllEnteries = asyncHandler(async (req, res) => {
  const filter = buildDateFilter(req.query);
  const packingEntries = await packingService.getEntries(filter);
  res.json(packingEntries);
});

// Analytics Route
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await packingAnalytics.getRoleDashboardStats(req.user._id, req.user.role);
  res.json(stats);
});

export default {
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
