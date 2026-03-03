import packingModel from "./packing.model.js";

export const createEntry = async (data) => {
    return await packingModel.create(data);
};

export const getEntries = async (filter) => {
    return await packingModel.find(filter).populate("packing_confirm_by_name", "username").populate("businessman_name", "username");
};

export const updateEntry = async (id, userId, data) => {
    const entry = await packingModel.findById(id);
    if (!entry) throw new Error("Entry not found");

    // Check ownership
    if (entry.packing_confirm_by_name.toString() !== userId.toString() &&
        entry.businessman_name.toString() !== userId.toString()) {
        throw new Error("Access denied");
    }

    Object.assign(entry, data);
    return await entry.save();
};

export const deleteEntry = async (id, userId) => {
    const entry = await packingModel.findById(id);
    if (!entry) throw new Error("Entry not found");

    if (entry.packing_confirm_by_name.toString() !== userId.toString() &&
        entry.businessman_name.toString() !== userId.toString()) {
        throw new Error("Access denied");
    }

    return await entry.deleteOne();
};
