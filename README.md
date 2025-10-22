# ⚡ **CipherStudio — A Browser-Based React IDE**

> 🚀 **Build, preview, and manage React projects directly in your browser.**  
> Inspired by **CodeSandbox** and **NextLeap.js**, powered by the **MERN stack**.

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Backend-Render-46C6A5?style=for-the-badge&logo=render" />
  <img src="https://img.shields.io/badge/Database-MongoDB-4EA94B?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Stack-MERN-3C873A?style=for-the-badge&logo=react" />
</p>

---

## 🎯 **Objective**

**CipherStudio** is a full-stack web application designed to simulate a **real-time browser-based IDE for React projects**.  

It enables users to:
- ✍️ Write and preview React code directly in the browser  
- 💾 Save, manage, and load multiple project files  
- ⚡ Experience IDE-like functionality with a seamless full-stack setup  

The project focuses on building a **functional MVP** demonstrating essential IDE capabilities using modern MERN tools.

---

## ✨ **Key Features**

### 🔐 User Authentication
- Secure **JWT-based** registration and login  
- Persistent sessions using `localStorage`  

### 💾 Project Persistence
- Save and load entire projects (files + code) from MongoDB  
- User-specific data isolation  

### 📂 Project Management
- 🆕 **New:** Start from a blank React template  
- 💾 **Save:** Preserve your work with a project name  
- 📥 **Load:** Retrieve saved projects from the database  
- 🗑️ **Delete:** Remove projects with confirmation  

### 📝 Multi-File Editor
- 🧭 **File Explorer:** Manage `.js`, `.jsx`, `.css`, `.json` files  
- ➕ **Add New Files:** Easily via custom modal dialog  
- 🔁 **Switch Files:** Toggle between files instantly  
- 💻 **Code Editor:** Syntax highlighting powered by **Sandpack**  
- ⚡ **Live Preview:** Real-time React rendering (no refresh needed)  

### 💻 Interactive UI
- 🪟 **Resizable Panels** for editor & preview layout  
- 🔔 **Toast Notifications** for key actions  
- 🗂️ **Custom Modals** for file creation & deletion  
- 🌙 **Dark Theme** with cohesive design aesthetics  

---

## 🏗️ **Architecture Overview**

CipherStudio follows a modular **client–server architecture**:

| Layer | Technology | Description |
|:------|:------------|:-------------|
| **Frontend (Client)** | React + Vite | Manages UI, live editing, and communicates with backend via REST API. Uses JWT for authentication. |
| **Backend (Server)** | Node.js + Express.js | Handles authentication, CRUD operations, and JWT validation. |
| **Database** | MongoDB Atlas | Stores user data and project files. |

---

## 🛠️ **Technology Stack**

### 🧩 Frontend
- ⚛️ **React 18**  
- ⚙️ **Vite** (fast dev & build tool)  
- 🧭 **react-router-dom** (routing)  
- 💻 **@codesandbox/sandpack-react**, **sandpack-themes** (editor & live preview)  
- 🪟 **react-resizable-panels** (resizable UI panes)  
- 🧱 **lucide-react** (icons)  
- 🎨 **CSS with Variables** (custom dark theme)

### ⚙️ Backend
- 🟢 **Node.js**  
- 🚀 **Express.js**  
- 🧩 **Mongoose** (MongoDB ORM)  
- 🔐 **jsonwebtoken**, **bcryptjs** (auth & password encryption)  
- 🌍 **cors** (API access middleware)

### 🗄️ Database
- ☁️ **MongoDB Atlas** (Cloud-hosted, NoSQL)

### 🌐 Deployment
- 🖥️ **Frontend:** [Vercel](https://vercel.com/)  
- 🧠 **Backend:** [Render](https://render.com/)

---

## 🚀 **Setup & Installation (Run Locally)**

### 🧰 Prerequisites
Ensure you have:
- Node.js (v18+)
- npm (comes with Node)
- Git
- MongoDB Atlas account



