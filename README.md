# 🧠 Smart Note App

**Smart Note** is a full-featured web application for managing personal notes with smart features. It includes AI-powered summarization, secure user authentication, Google login, and much more.

---

## 🚀 Features

- ✅ User registration with email verification
- 🔐 Login with email/password or Google
- 📩 Password recovery via email OTP
- 📝 Create, update, delete, and view notes
- 🤖 Summarize notes using OpenAI API
- 🛡️ Secured routes using JWT and middlewares
- 📷 Upload profile and cover images
- 👤 Role-based access control
- 💾 MongoDB & Mongoose for data storage

---

## 🛠️ Tech Stack

| Category       | Technology                         |
|----------------|-------------------------------------|
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB + Mongoose                  |
| Authentication | JWT, Bcrypt, 2FA, Nodemailer        |
| Validation     | Joi, CORS, Helmet, Rate Limiting    |
| AI Integration | OpenAI API                          |
| Email Service  | Nodemailer with HTML templates      |
| File Uploads   | Multer                              |
| Structure      | MVC + Modular Folder Structure      |

---

## 📁 Project Structure

```bash
Smart-Note/
│
├── src/
│   ├── config/            # Environment & app configs
│   ├── middleware/        # Auth, validation, protection
│   ├── modules/
│   │   ├── user/          # User registration and profile
│   │   ├── note/          # Notes CRUD and summarization
│   │   └── auth/          # Login, password, OTP handling
│   ├── utils/             # Utility functions
│   ├── services/          # Email and AI services
│   └── app.js             # Main app entry
│
├── .env.dev               # Example environment file
├── .gitignore             # Ignored files
├── package.json
└── README.md
