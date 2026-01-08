import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import { Course } from "../models/courseModel.js";
import { User } from "../models/userModel.js";


if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
  console.error("RAZORPAY_KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
  throw new Error("❌ Razorpay keys missing. Check your backend/.env file.");
}


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const RazorPayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const options = {
      amount: course.price * 100, // in paise
      currency: "INR",
      receipt: courseId.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log("verifyPayment HIT", req.body);

    const {
      razorpay_payment_id,
      courseId,
      userId,
    } = req.body;

    if (!razorpay_payment_id || !courseId || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let payment;
    try {
      payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
    } catch (err) {
      console.error("Razorpay fetch error:", err);
      return res.status(400).json({ message: "Invalid payment id" });
    }

    if (!payment || payment.status !== "captured") {
      return res.status(400).json({ message: "Payment not captured" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Ensure arrays exist
    if (!Array.isArray(user.enrolledCourses)) user.enrolledCourses = [];
    if (!Array.isArray(course.enrolledStudents)) course.enrolledStudents = [];

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({ message: "Payment verified and enrolled" });

  } catch (error) {
    console.error("VerifyPayment fatal error:", error);
    return res.status(500).json({ message: "Internal payment verification error" });
  }
};
