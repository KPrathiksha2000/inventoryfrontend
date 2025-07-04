# ♻️ Recyclable Waste Pickup System

A full-stack **MERN (MongoDB, Express, React, Node.js)** web application that allows **residents** to schedule recyclable waste pickups from their homes, and enables **administrators** to manage those requests effectively.

---

### 👤 User
- Register and log in as a user
- Schedule a waste pickup by providing:
  - Waste type
  - Quantity
  - Location
- View success confirmation
- Logout functionality

### 🛡️ Admin
- Log in as an admin (no self-registration)
- View all pickup requests
- Mark requests as **Pending**, **Scheduled**, or **Completed**
- Delete requests (Cancel)
- Logout functionality

---

## 🔐 Role-Based Access

| Role     | Access                    |
|----------|---------------------------|
| User     | `/user` – Schedule pickup |
| Admin    | `/admin` – Admin panel    |
| Visitor  | `/` – Login page          |

---

## 🛠️ Tech Stack

| Layer     | Tools/Tech                      |
|-----------|---------------------------------|
| Frontend  | React, Axios, React Router, CSS |
| Backend   | Node.js, Express                |
| Database  | MongoDB Atlas (Cloud)           |
| Other     | Mongoose, dotenv, cors, GitHub  |

---
