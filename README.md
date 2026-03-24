LIVE LINK 

https://lms-ai-1-64wc.onrender.com/




# 🎓 AI Powered Learning Management System (LMS)

A full-stack Learning Management System built using the MERN stack with AI-powered search, Google authentication, Razorpay payments, and role-based access for students and educators.

This platform allows educators to create and publish courses, while students can search (using AI or voice), enroll via secure payments, and watch lectures.

---

## 🚀 Features

### 👨‍🎓 Student
- Sign up / login (email or Google)
- Browse and search courses using AI
- Voice-based course search
- Enroll in courses using Razorpay
- Watch lectures after enrollment

### 👨‍🏫 Educator
- Create and manage courses
- Upload lecture videos and thumbnails
- Publish/unpublish courses
- View enrolled students and earnings

### 🔐 Authentication
- JWT based authentication with cookies
- Google OAuth using Firebase
- Role-based route protection

### 🧠 AI Search
- Google Gemini API understands user intent
- Converts natural language queries into relevant keywords
- Searches MongoDB using semantic intent

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (media uploads)
- Nodemailer (email OTP)
- Razorpay (payments)
- Google Gemini API (AI search)

### Other
- Firebase Google Authentication
- Web Speech API (voice search)

---

## 📁 Project Structure

/frontend
├── pages
├── components
├── redux
└── customHooks

/backend
├── controllers
├── models
├── routes
├── middleware
└── config



---










Remaining - navigation button for login and sign-up





## ⚙️ Environment Variables

Create a `.env` file in the backend:

```env
PORT=4001
MONGODB_URI=your_mongodb_url
JWT_SECRET_KEY=your_secret
USER_EMAIL=your_email
EMAIL_PASSWORD=your_password
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
GEMINI_API_KEY=your_gemini_key



