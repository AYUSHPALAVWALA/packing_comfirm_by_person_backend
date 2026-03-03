"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEntry = exports.getEntries = exports.deleteEntry = exports.createEntry = void 0;
var _packingModel = _interopRequireDefault(require("./packing.model.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const createEntry = async data => {
  return await _packingModel.default.create(data);
};
exports.createEntry = createEntry;
const getEntries = async filter => {
  return await _packingModel.default.find(filter).populate("packing_confirm_by_name", "username").populate("businessman_name", "username");
};
exports.getEntries = getEntries;
const updateEntry = async (id, userId, data) => {
  const entry = await _packingModel.default.findById(id);
  if (!entry) throw new Error("Entry not found");

  // Check ownership
  if (entry.packing_confirm_by_name.toString() !== userId.toString() && entry.businessman_name.toString() !== userId.toString()) {
    throw new Error("Access denied");
  }
  Object.assign(entry, data);
  return await entry.save();
};
exports.updateEntry = updateEntry;
const deleteEntry = async (id, userId) => {
  const entry = await _packingModel.default.findById(id);
  if (!entry) throw new Error("Entry not found");
  if (entry.packing_confirm_by_name.toString() !== userId.toString() && entry.businessman_name.toString() !== userId.toString()) {
    throw new Error("Access denied");
  }
  return await entry.deleteOne();
};
exports.deleteEntry = deleteEntry;