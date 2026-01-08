import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "User have no taken" });
    }
    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken) {
      return res.status(400).json({ message: "User have no Valid taken" });
    }
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default isAuth;
