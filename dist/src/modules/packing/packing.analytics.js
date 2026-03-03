"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStats = exports.getRoleDashboardStats = void 0;
var _packingModel = _interopRequireDefault(require("./packing.model.js"));
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const getStats = async (filter = {}) => {
  const stats = await _packingModel.default.aggregate([{
    $match: filter
  }, {
    $group: {
      _id: null,
      total: {
        $sum: "$quantity"
      },
      count: {
        $sum: 1
      }
    }
  }]);
  return stats[0] || {
    total: 0,
    count: 0
  };
};
exports.getStats = getStats;
const getRoleDashboardStats = async (userId, role) => {
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const userFilter = role === 'admin' ? {} : role === 'businessman' ? {
    businessman_name: new _mongoose.default.Types.ObjectId(userId)
  } : {
    packing_confirm_by_name: new _mongoose.default.Types.ObjectId(userId)
  };
  const [total, today, month, year] = await Promise.all([getStats(userFilter), getStats({
    ...userFilter,
    parcel_date_time: {
      $gte: todayStart
    }
  }), getStats({
    ...userFilter,
    parcel_date_time: {
      $gte: monthStart
    }
  }), getStats({
    ...userFilter,
    parcel_date_time: {
      $gte: yearStart
    }
  })]);
  return {
    total: total.total,
    today: today.total,
    month: month.total,
    year: year.total
  };
};
exports.getRoleDashboardStats = getRoleDashboardStats;