import * as authService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";

const registerUsers = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const { user, token } = await authService.registerUser({ username, email, password, role });

  res.status(201).json({
    message: "New user registered successfully.",
    user: {
      id: user._id,
      name: user.username,
      email: user.email,
      role: user.role,
    },
    token,
  });
});

const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const { user, token } = await authService.loginUser({ email, password });

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.username,
      role: user.role
    }
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const filter = req.query.role ? { role: req.query.role } : {};
  const users = await authService.getAllUsers(filter);
  res.json(users);
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await authService.deleteUserById(id);
  res.json({ message: "User deleted successfully" });
});

export default { registerUsers, loginUsers, getUsers, getMe, deleteUser };
