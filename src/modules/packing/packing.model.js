import mongoose from "mongoose";

const packingSchema = new mongoose.Schema(
  {
    packing_confirm_by_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersRegister",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    businessman_name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usersRegister",
      required: true,
    },
    parcel_date_time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const packingModel = mongoose.model("packingEntries", packingSchema);
export default packingModel;
