# QuickHire – Job Listing Platform

## 📖 Project Overview

QuickHire is a job listing platform where employers can create and manage job posts while candidates can browse jobs and apply. It includes admin job management, job details, and application handling.

---

## 🚀 Features

- Job listing with filtering
- Job details page
- Apply to job functionality
- Admin can create jobs
- Admin can delete jobs
- Admin dashboard
- API integration with backend
- Deployment-ready setup

---

## 🛠 Tech Stack

- Next.js
- Node.js
- Express.js
- MongoDB
  \*Mongoose
- Shadcn
- Tailwind CSS
- Axios
- PM2 (Production)
- Nginx (Deployment)

---

## ⚙ Environment Variables

### 🔹 Create a `.env` file in the root:

```
NEXT_PUBLIC_BASE_URL=https://quickhire-api.anaadevelopersltd.com/api/v1

```

### 🔹 `.env.example`

```

NODE_ENV=development
PORT=5001

DATABASE_URL=mongodb+srv://nextAuth:nextAuth123@cluster0.fomplst.mongodb.net/quickhire?retryWrites=true&w=majority&appName=Cluster0

# Cloudinary
CLOUDINARY_NAME=do2cbxkkj
CLOUDINARY_API_KEY=581756315446585
CLOUDINARY_SECRET=Q2IhMl_KosE4E2XPeGez8xrd6b0
# CORS
CROSS_ORIGIN_CLIENT=https://quickhire.anaadevelopersltd.com
CROSS_ORIGIN_ADMIN_LOCALHOST=http://localhost:3000
CROSS_ORIGIN_CLIENT_LOCALHOST=http://localhost:3001

```

---

## 💻 How to Run Locally

### 🔥 Frontend

```bash
git clone https://github.com/yourusername/quickhire.git
cd quickhire
npm install
npm run dev
```

Open: `http://localhost:3000`

---

### 🔥 Backend

```bash
cd backend
npm install
npm run dev
```

---

## Deployment

The application is deployed on a VPS server using:

- Nginx (Reverse Proxy)
- PM2 (Process Manager)
- Node.js Production Build

Frontend:
https://quickhire.anaadevelopersltd.com

Backend API:
https://quickhire-api.anaadevelopersltd.com

---

## 🎥 Demo Video

Demo (3–5 Minutes):

```
https://www.loom.com/share/9364700813d842cab3ba460750ae7670
```

### Demo Should Cover:

- Job listing
- Job details
- Applying to a job
- Admin login
- Admin create job
- Admin delete job

---

## 📦 Repository

GitHub:

```
https://github.com/Ibrahim-Sikder/quickhire-client
```

---

## ✨ Author

Ibrahim Sikder (Frontend Developer)

---
