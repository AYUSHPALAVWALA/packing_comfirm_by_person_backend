import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export default generateToken;
