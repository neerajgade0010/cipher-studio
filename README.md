# ⚡ CipherStudio — A Browser-Based React IDE  

> Build, preview, and manage React projects directly in your browser.  
> Inspired by **CodeSandbox** and **NextLeap.js**, powered by the **MERN stack**.  

---

## 🎯 Objective  

**CipherStudio** is a full-stack web application that simulates a real-time, browser-based Integrated Development Environment (IDE) for React projects.  

It enables users to:
- Write, preview, save, and manage React code directly in the browser  
- Experience IDE-like features (multi-file editing, live preview, and project persistence)  
- Demonstrate full-stack integration using the **MERN** stack  

The project focuses on building a **functional MVP** showcasing essential IDE functionalities with modern tools and libraries.  

---

## ✨ Key Features  

### 🔐 User Authentication  
- Secure registration and login via **JWT (JSON Web Tokens)**  

### 💾 Project Persistence  
- Save, load, and delete React projects tied to user accounts (MongoDB storage)

### 📂 Project Management  
- **Save:** Store project files and code by name  
- **Load:** Retrieve previously saved projects  
- **New:** Start a fresh React template  
- **Delete:** Permanently remove projects (with confirmation)

### 📝 Multi-File Editor  
- **File Explorer:** Browse `.js`, `.jsx`, `.css`, `.json` files  
- **File Creation:** Add new files via custom modal dialog  
- **File Switching:** Instantly open files in the editor  
- **Code Editor:** Rich syntax highlighting powered by **Sandpack**  
- **Live Preview:** Real-time React rendering using Sandpack bundler  

### 💻 Interactive UI  
- **Resizable Panels:** Adjust layout via drag handles  
- **Toast Notifications:** Quick visual feedback for actions  
- **Custom Modals:** Clean dialogs for creating or deleting files  
- **Theming:** Consistent custom dark theme across the app  

---

## 🏗️ Architecture Overview  

CipherStudio uses a **client–server architecture**:

| Layer | Technology | Description |
|-------|-------------|-------------|
| **Frontend (Client)** | React + Vite | Handles UI, user interactions, live code editing, and communicates with backend via REST APIs. Uses JWT stored in `localStorage` for sessions. |
| **Backend (Server)** | Node.js + Express.js | Manages authentication, CRUD for projects, and validates JWT tokens. |
| **Database** | MongoDB Atlas | Stores user accounts and project data (name, files, user info). |

---

## 🛠️ Technology Stack  

### 🧩 Frontend
- **Framework:** React 18  
- **Build Tool:** Vite  
- **Routing:** `react-router-dom`  
- **Editor/Preview:** `@codesandbox/sandpack-react`, `@codesandbox/sandpack-themes`  
- **Layout:** `react-resizable-panels`  
- **Icons:** `lucide-react`  
- **Styling:** Pure CSS (with CSS Variables)  

### ⚙️ Backend
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database ORM:** Mongoose  
- **Authentication:** `jsonwebtoken`, `bcryptjs`  
- **Middleware:** `cors`  

### 🗄️ Database
- **MongoDB Atlas** (Cloud-hosted NoSQL)

### 🌐 Deployment
- **Frontend:** Vercel  
- **Backend:** Render  

---

## 🚀 Setup & Installation (Run Locally)

### 🧰 Prerequisites
- Node.js (v18 or later)  
- npm (comes with Node)  
- Git  
- MongoDB Atlas account
  

---
### ⚙️ 1. Clone the Repository  

- git clone https://github.com/neerajgade0010/cipher-studio.git
- cd cipher-studio



