import mongoose from "mongoose";
import { getStats, getRoleDashboardStats } from "./src/modules/packing/packing.analytics.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const s = await getStats({});
    console.log("Stats without filter:", s);

    // just some random id, it might return 0
    const rs = await getRoleDashboardStats('65c123456789012345678901', 'admin');
    console.log("Admin role stats:", rs);

    process.exit(0);
}).catch(console.error);
