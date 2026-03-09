# ServicePro – Smart Service Booking Platform

A fully functional, frontend-only modern Web App built with React and Tailwind CSS. ServicePro offers a seamless experience for Users to book services and for Providers to manage their offerings and bookings.

## 🌟 Features

### 👤 User Panel
- **Browse & Filter Services:** Search by keyword or filter by category (Cleaning, Repair, Gardening, etc.).
- **Interactive Grid/List Views:** Smooth transitions between layout modes.
- **Book Services:** Select Date and Time with an elegant modal UI.
- **Manage Bookings:** Track bookings, cancel pending requests, and track status.

### 🛠️ Provider Panel
- **Dashboard Overview:** Track active jobs, total earnings, and pending requests.
- **Manage Offerings:** Add, edit, or remove services to reflect your availability.
- **Booking Management:** Accept, Reject, or Mark bookings as Completed.

### ✨ UI & Experience highlights
- **Fully Responsive:** Custom mobile hamburger menu and sidebar.
- **Smooth Animations:** Integrated `framer-motion` for page, list, and modal transitions.
- **State Management:** Uses React Context and `localStorage` to persist data locally without needing a backend.
- **Notifications:** Built with `react-hot-toast` for elegant state feedback.

## 🚀 Tech Stack
- **React 18** (Vite)
- **Tailwind CSS 3**
- **Framer Motion**
- **Lucide React** (Icons)
- **React Router Dom**
- **React Hot Toast**

---

## 💻 How to Run Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed on your system.

### 2. Installation
Open your terminal in the project directory and run:

```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit the local server address provided (usually `http://localhost:5173/`).

### 4. Demo Data & Operations
The project comes pre-loaded with mock data for services and bookings.
- **Switch Roles:** Use the "Switch to Provider" / "Switch to User" button located at the bottom of the sidebar to test out both panels seamlessly!
- **Data Persistence:** Try adding a booking, modifying a service, or accepting a request. Refresh the page to see the local storage persistence in action.
