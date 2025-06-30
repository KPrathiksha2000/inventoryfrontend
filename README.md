# ♻️ Recyclable Waste Pickup System

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application that allows **residents** to schedule recyclable waste pickups from their homes, and enables **administrators** to manage those requests effectively.

---

## 🌟 Features

### 🧍 Resident View
- Submit a pickup request with:
  - Waste type
  - Quantity
  - Location
- Simple and mobile-friendly UI

### 👨‍💼 Admin Panel
- View all pickup requests
- Update request status (Pending → Scheduled → Completed)
- Delete/cancel requests

---

## 🛠️ Tech Stack

| Layer     | Tools/Tech               |
|-----------|--------------------------|
| Frontend  | React, Axios, React Router, CSS |
| Backend   | Node.js, Express         |
| Database  | MongoDB Atlas (Cloud)    |
| Other     | Mongoose, dotenv, cors, GitHub |

---

## ⚙️ Project Structure
waste_pickup/
├── backend/
│ ├── server.js
│ ├── models/
│ │ └── Request.js
│ └── routes/
│ └── requestRoutes.js
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── RequestForm.js
│ │ │ └── AdminPanel.js
│ │ ├── App.js
│ │ └── App.css
│ └── public/
│ └── index.html
├── .gitignore
├── README.md
└── package.json

