# 🎓 UNI_LOST

A full-stack Lost & Found Management System developed for university campuses. The platform helps students report lost items, upload found items, search listings, and claim belongings efficiently.

---

# 📌 Project Overview

UNI_LOST is designed to digitize the traditional lost-and-found process inside a university campus.

Instead of depending on manual notices or WhatsApp groups, users can:

- Report lost items
- Upload found items
- Search items easily
- Claim belongings
- Manage authentication securely

The project uses a Node.js + Express backend with MongoDB database integration.

---

# 🚀 Features

| Feature | Description |
|---|---|
| User Authentication | Secure Signup/Login System |
| Lost Item Reporting | Users can upload lost item details |
| Found Item Upload | Users can upload found items |
| Claim Request System | Users can claim matched items |
| Dashboard | Manage user activities |
| MongoDB Database | Stores users and item information |
| REST APIs | Backend APIs using Express.js |
| Responsive UI | Simple and user-friendly interface |
| Search Functionality | Search lost/found items |
| Notification Pages | Notification-related UI pages |

---

# 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT Authentication |
| API Testing | Postman |
| Version Control | Git & GitHub |
| Environment Variables | dotenv |

---

# 📂 Complete Project Structure

```bash
UNI_LOST/
│
├── lost-found-backend/
│   ├── models/
│   │   ├── item.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   ├── claims.js
│   │   └── items.js
│   │
│   ├── utils/
│   │
│   ├── .env
│   ├── server.js
│   └── node_modules/
│
├── .gitignore
├── dashboard.html
├── index.html
├── lost_item_found2.html
├── muj.png
├── notification2.html
├── package-lock.json
├── package.json
├── pbl yashvi.pdf
├── PBL-3 END TERM FINAL.pptx
├── profile.html
├── README.md
├── search_matching_result.html
└── signup.html
```

---

# 📖 File Explanation

## 🔹 Backend Folder

### `lost-found-backend/`

Contains the complete backend logic of the project.

---

## 🔹 Models Folder

### `models/item.js`

Defines the MongoDB schema for lost and found items.

Purpose:

- Stores item information
- Saves item name, description, category, image, status, etc.

---

### `models/user.js`

Defines the MongoDB schema for users.

Purpose:

- Stores user authentication details
- Saves email, password, username, etc.

---

## 🔹 Routes Folder

### `routes/auth.js`

Handles authentication APIs.

Functions:

- User Signup
- User Login
- JWT Token generation

---

### `routes/claims.js`

Handles item claiming functionality.

Functions:

- Submit claim requests
- Manage claimed items

---

### `routes/items.js`

Handles item-related APIs.

Functions:

- Add lost item
- Add found item
- Fetch all items
- Search items

---

## 🔹 Utility Folder

### `utils/`

Contains reusable helper functions and utility logic.

---

## 🔹 Important Backend Files

### `.env`

Stores secret environment variables.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

---

### `server.js`

Main backend entry point.

Responsibilities:

- Connects MongoDB
- Starts Express server
- Loads routes
- Handles middleware

---

# 🌐 Frontend Files Explanation

| File Name | Purpose |
|---|---|
| `index.html` | Login page of the application |
| `signup.html` | User registration page |
| `dashboard.html` | Main dashboard after login |
| `profile.html` | User profile page |
| `notification2.html` | Notifications UI |
| `lost_item_found2.html` | Upload lost/found item page |
| `search_matching_result.html` | Search and matching results page |
| `muj.png` | Image/logo asset |

---

# ⚙️ Installation & Setup Guide

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Yashvitaunk/UNI_LOST.git
```

---

## 2️⃣ Navigate Into Project Folder

```bash
cd UNI_LOST
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

If backend dependencies are inside backend folder:

```bash
cd lost-found-backend
npm install
```

---

# ▶️ Run the Project

## Start Backend Server

```bash
node server.js
```

OR

```bash
npm start
```

---

# ✅ Expected Terminal Output

```bash
MongoDB Connected Successfully
Server listening on port 3000
```

---

# 🔐 Authentication Flow

| Step | Process |
|---|---|
| 1 | User signs up |
| 2 | Password stored securely |
| 3 | User logs in |
| 4 | JWT token generated |
| 5 | Protected routes accessed |

---

# 🔄 Project Workflow

```text
User → Frontend UI → Express API → MongoDB Database
```

Detailed Flow:

1. User fills form in frontend.
2. Request goes to Express backend.
3. Backend validates data.
4. MongoDB stores/fetches data.
5. Response sent back to frontend.
6. Data displayed dynamically.

---

# 📸 Project Preview

| Page | Preview |
|---|---|
| Login Page | Add Screenshot |
| Signup Page | Add Screenshot |
| Dashboard | Add Screenshot |
| Lost/Found Upload Page | Add Screenshot |

---

# 🧪 API Testing

The APIs were tested using Postman.

Sample APIs:

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/signup` | Register user |
| POST | `/login` | Login user |
| GET | `/items` | Fetch items |
| POST | `/claim` | Claim item |

---

# 🎯 Future Improvements

- AI-based item matching
- Email notifications
- Real-time chat system
- Admin dashboard
- Image recognition support
- OTP verification
- Advanced filters

---

# 👩‍💻 Author

| Name | Role |
|---|---|
| Yashvi Taunk | Full Stack Developer |

---

# 📄 License

This project is developed for educational and learning purposes.

---

# ⭐ Clone Repository

```bash
git clone https://github.com/Yashvitaunk/UNI_LOST.git
```

---

# 🔗 GitHub Repository Link

https://github.com/Yashvitaunk/UNI_LOST