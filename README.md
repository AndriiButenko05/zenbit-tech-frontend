# Real Estate Investment Platform 🏢

This is the frontend part of a technical assignment: a platform for browsing and investing in real estate properties. The project features a fully responsive design (works perfectly on both desktop and mobile) and a complete authentication system.

🌍 **Live Demo:** [View project on Vercel](https://zenbit-tech-frontend.vercel.app/)

## ✨ Key Features

* **Property Catalog:** Browse a list of available properties with prices, yield, and sold percentages.
* **Authentication:** User registration and login (using JWT tokens).
* **Protected Actions:** The "Invest" button and the application modal correctly handle logged-in user data (the user's email is auto-filled).
* **Modals:** Implemented using React Portals to avoid CSS `z-index` and overflow conflicts.
* **Responsive Design:** Mobile-friendly interface (featuring a hamburger menu) that scales perfectly to wide desktop screens.
* **Notifications:** Users receive sleek toast notifications for successful actions or errors.

## 🛠 Tech Stack

* **React (Vite)** — for fast UI development and building.
* **Redux Toolkit** — for global state management (storing user sessions and property data).
* **React Router v6** — for seamless page navigation (Home, Login, Register, Reset Password).
* **CSS Modules** — for scoped styling (ensuring styles don't leak and break other components).
* **Axios** — for making HTTP requests to the backend API.
* **React Hot Toast** — for pop-up user notifications.

## 🚀 How to Run Locally

To get this project running on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AndriiButenko05/zenbit-tech-frontend
   cd zenbit-tech-frontend
   npm install
   npm run dev
   ```
