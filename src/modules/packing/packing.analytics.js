import packingModel from "./packing.model.js";
import mongoose from "mongoose";

export const getStats = async (filter = {}) => {
    const stats = await packingModel.aggregate([
        { $match: filter },
        {
            $group: {
                _id: null,
                quantitySum: { $sum: "$quantity" },
                entryCount: { $sum: 1 }
            }
        }
    ]);
    return stats[0] || { quantitySum: 0, entryCount: 0 };
};

export const getRoleDashboardStats = async (userId, role) => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const userFilter = role === 'admin' ? {} : (role === 'businessman' ? { businessman_name: new mongoose.Types.ObjectId(userId) } : { packing_confirm_by_name: new mongoose.Types.ObjectId(userId) });

    const [total, today, month, year] = await Promise.all([
        getStats(userFilter),
        getStats({ ...userFilter, parcel_date_time: { $gte: todayStart } }),
        getStats({ ...userFilter, parcel_date_time: { $gte: monthStart } }),
        getStats({ ...userFilter, parcel_date_time: { $gte: yearStart } })
    ]);

    return {
        total: total.entryCount,
        today: today.entryCount,
        month: month.entryCount,
        year: year.entryCount,
        totalQuantity: total.quantitySum,
        todayQuantity: today.quantitySum,
        monthQuantity: month.quantitySum,
        yearQuantity: year.quantitySum
    };
};
