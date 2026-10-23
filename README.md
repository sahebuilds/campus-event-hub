# 🏛️ Campus Event Hub & Ticket Manager System

A full-stack, enterprise-grade web application built to digitize and streamline university event discovery, seat reservations, role-based governance, and digital ticket verification.

---

## 🚀 Key Features

### 🎓 Student Portal
* **Event Discovery & Filtering:** Browse upcoming campus events categorized by technical, cultural, and academic streams with real-time capacity indicators.
* **Secure Seat Reservations:** Instantly book event passes with automated capacity checks to prevent overbooking.
* **Digital Ticket Wallet:** Access active passes complete with unique verification tokens (`#OX-XXXX-X`) and event details.
* **Pass Cancellation & Seat Release:** Seamlessly cancel booked passes, automatically freeing up slots in the live database for other students.

### 📊 Organizer Dashboard & Command Center
* **Role-Based Access Control (RBAC):** Strict operational boundaries separating student discovery from administrative event publishing and management.
* **Event Lifecycle Management:** Publish new campus events with custom titles, venues, categories, dates, and seating caps.
* **Live Occupancy Tracking:** Real-time capacity progress bars and reservation metrics.
* **Attendee Management Modal:** Inspect registered student rosters (names, emails, token IDs) directly from the dashboard.
* **CSV Data Export:** Instantly download attendance reports formatted for event gatekeepers and administrative audits.

---

## 🛠️ Technology Stack

* **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons, Axios
* **Backend:** Node.js, Express.js, RESTful APIs
* **Database & ODM:** MongoDB Atlas, Mongoose
* **Architecture:** Decoupled Client-Server Model

---

## 📁 Project Structure

```text
campus-event-hub/
│
├── client/                 # React Frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Student & Organizer views
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Node.js & Express Backend
│   ├── controllers/        # Business logic & database operations
│   ├── models/             # Mongoose schemas (User, Event, Ticket)
│   ├── routes/             # RESTful API routing endpoints
│   ├── server.js           # Entry point and database connection
│   └── package.json
│
└── README.md