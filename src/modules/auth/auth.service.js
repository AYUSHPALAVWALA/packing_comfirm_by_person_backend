import usersModel from "../user/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../../utils/generateToken.js";

export const registerUser = async ({ username, email, password, role }) => {
    const isUserAlreadyExists = await usersModel.findOne({ email });
    if (isUserAlreadyExists) {
        throw new Error("Email already exists");
    }

    const hashedpassword = await bcrypt.hash(password, 12);
    const user = await usersModel.create({
        username,
        email,
        password: hashedpassword,
        role: role || "businessman",
    });

    const token = generateToken(user._id, user.role);
    return { user, token };
};

export const loginUser = async ({ email, password }) => {
    const user = await usersModel.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id, user.role);
    return { user, token };
};

export const getAllUsers = async (filter = {}) => {
    return await usersModel.find(filter).select("-password");
};

export const getUserById = async (id) => {
    return await usersModel.findById(id).select("-password");
};

export const deleteUserById = async (id) => {
    return await usersModel.findByIdAndDelete(id);
};

