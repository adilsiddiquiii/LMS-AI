import jwt from "jsonwebtoken";

export const genToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log(`Token: ${token} `);
    return token;
  } catch (error) {
    console.log(`token not generated : error is ${error}`);
  }
};
