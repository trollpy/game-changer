# Agri-Link Platform

A MERN stack platform connecting small-scale and large-scale farmers with buyers, markets, and each other.

Agri-Link is a comprehensive web-based marketplace platform designed to revolutionize agricultural commerce in South Africa by connecting farmers directly with buyers, eliminating intermediaries, and providing essential market intelligence. The platform addresses the critical digital divide in agriculture while enabling fair trade practices and inclusive market access.


---

## 🚀 Deployment Overview

### 🌐 Frontend (Vite + React + Tailwind CSS)
- **Hosted on**: [Vercel](https://vercel.com)
- **Tech**: Vite, React, Tailwind CSS, Clerk for authentication
- **Env Variables** (example):
```env
VITE_API_URL=xxxxxxxxxxxxxx
VITE_WS_URL=wss://
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxx
```

### ⚙️ Backend (Express.js + MongoDB)
- **Hosted on**: [Render](https://render.com)
- **Tech**: Express.js, MongoDB Atlas, WebSocket (ws), Clerk middleware
- **Env Variables** (example):
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
CLERK_API_URL=https://api.clerk.dev/v1
CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## 🔁 CI/CD Pipeline

- **Frontend**: Vercel Auto Deploy on push to `main`
- **Backend**: Render Auto Deploy from GitHub

---

## 🔍 Monitoring & Error Tracking

- **Logging**: Winston/Console
- **Monitoring**: (Setup suggestion: LogRocket, Sentry or PostHog)
- **Ping/Health Check**: Render Health Checks enabled

---

## 📄 API Documentation

### Base URL:
```
https://agri-link-backend.onrender.com/api
```

#### 📥 Auth
- `POST /auth/login`
- `POST /auth/register`

#### 📦 Listings
- `GET /listings`
- `POST /listings`
- `GET /listings/:id`
- `DELETE /listings/:id`

#### 💬 Messaging
- `GET /messages/:roomId`
- `POST /messages`

More API routes documented in Swagger/Postman.

---

## 🧑‍💻 Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Clerk Account

### Frontend Setup
```bash
cd frontend
pnpm install
pnpm dev
```

### Backend Setup
```bash
cd backend
pnpm install
pnpm run dev
```

---

## 🏗️ Technical Architecture

```
📁 frontend (Vite + React)
📁 backend (Express.js API + WebSocket)
📦 MongoDB Atlas (Database)
🔐 Clerk.dev (Authentication)
☁️ Render & Vercel (Deployment)
```

- WebSocket for real-time messaging
- REST API for CRUD operations
- Clerk middleware for user auth & RBAC

---

## 📘 User Guide

### Users Can:
- Register & login with Clerk
- Post listings for farm products
- Chat in real time with other users
- View real-time market prices (via AgriBase API)

---

## 📢 Contributions & License

All contributions are welcome. Please fork the repo and submit PRs.  
MIT License.
