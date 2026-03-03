import mongoose from "mongoose";
import dotenv from "dotenv";
import packingModel from "./src/modules/packing/packing.model.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const entries = await packingModel.find().limit(5);
    console.log("Sample entries:", JSON.stringify(entries, null, 2));

    const count = await packingModel.countDocuments();
    console.log("Total document count:", count);

    const aggregate = await packingModel.aggregate([
        {
            $group: {
                _id: null,
                total: { $sum: "$quantity" },
                count: { $sum: 1 }
            }
        }
    ]);
    console.log("Aggregation result:", aggregate);

    process.exit(0);
}).catch(console.error);
