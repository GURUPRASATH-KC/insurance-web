# Insurance Web Platform

**Live Demo:** [https://insurance-web-rosy.vercel.app](https://insurance-web-rosy.vercel.app)

A full-stack insurance platform built with React (Vite), Node.js, Express, and MongoDB.

## 🛠️ Technologies

### Frontend
- React 19 (Vite)
- Tailwind CSS (v4)
- Framer Motion
- Axios
- React Router DOM
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication
- Bcrypt.js
- CORS

### Deployment
- Frontend → **Vercel**
- Backend → **Render**
- Database → **MongoDB Atlas**

## 📁 Project Structure

```
insurance-web/
│
├── client/        # Frontend (React + Vite, Tailwind CSS)
│   ├── src/       # React Components, Pages, and Assets
│   ├── public/
│   └── package.json
│
├── server/        # Backend (Node + Express)
│   ├── index.js   # Server Entry Point
│   ├── routes/    # API Routes
│   ├── models/    # Mongoose Database Models
│   └── package.json
│
└── README.md
```

## ⚙️ Environment Variables

### Backend (`server/.env`)
Create a `.env` file in the `server` directory with the following variables:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (`client/.env`)
Create a `.env` file in the `client` directory with the following variables:
```env
VITE_API_URL=https://insurance-web-98kt.onrender.com
```

---

## 🚀 Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/GURUPRASATH-KC/insurance-web.git
cd insurance-web
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will run at `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
The client app will be accessible at `http://localhost:5173`.

---

## ☁️ Deployment Guide

### Frontend (Vercel)
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Backend (Render)
- **Root Directory:** `server`
- **Build Command:** `npm install`
- **Start Command:** `node index.js`

---

## ✨ Features

- User Registration & Login
- JWT Authentication
- Insurance plan management
- RESTful API architecture
- MongoDB data storage
- Fully responsive UI with Tailwind CSS and Framer Motion animations
- Cloud deployment (Vercel + Render)

---

## 🛣️ API Endpoints

| Method | Endpoint    | Description          |
|--------|-------------|----------------------|
| GET    | `/`         | Server health check  |
| POST   | `/register` | Register new user    |
| POST   | `/login`    | Authenticate user    |
| GET    | `/plans`    | Get insurance plans  |

---

## 🏗️ Architecture

```
Frontend (React App on Vercel)
       │
       ▼ (REST API Requests)
Backend (Express Server on Render)
       │
       ▼ (Mongoose Queries)
Database (MongoDB Atlas)
```

## 📄 License

This project is open-source and free to use.
