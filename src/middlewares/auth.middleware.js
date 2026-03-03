import jwt from "jsonwebtoken";
import usersModel from "../modules/user/user.model.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await usersModel.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Server failed :", error.message);
    return res.status(401).json({ message: "Token failed" });
  }
};

export default protect;
