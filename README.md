### Frontend
- React (Vite)
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication (if used)

### Deployment
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

## 📁 Project Structure

```
insurance-web/
│
├── client/        # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/        # Backend (Node + Express)
│   ├── index.js
│   ├── routes/
│   ├── models/
│   └── package.json
│
└── README.md
```

## Environment Variables

### Backend (.env)

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000


### Frontend (.env)

VITE_API_URL=https://insurance-web-98kt.onrender.com


---

##  Setup Instructions

### Clone Repository

git clone https://github.com/your-username/insurance-web.git

cd insurance-web


---

### Backend Setup

cd server
npm install
node index.js


---

### Frontend Setup

cd client
npm install
npm run dev


---

## Deployment Guide

###  Frontend (Vercel)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

###  Backend (Render)
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node index.js`

---

##  Features

- User Registration & Login
- JWT Authentication (if implemented)
- Insurance plan management
- REST API integration
- MongoDB data storage
- Fully responsive UI
- Cloud deployment (Vercel + Render)

---

##  API Endpoints


GET / → Server running
POST /register → Register user
POST /login → Login user
GET /plans → Get insurance plans


---

##  Architecture


Frontend (Vercel)
↓ API Requests
Backend (Render)
↓
MongoDB Atlas



##  License

This project is open-source and free to use.
