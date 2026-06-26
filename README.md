# 💰 Expense Tracker MERN

> *A full-stack expense tracking application built with MongoDB, Express, React, and Node.js. Track your income and expenses, visualize your spending habits, and take control of your finances.*

## Highlights

- **Full MERN Stack** — Complete MongoDB, Express, React, and Node.js implementation
- **Dashboard Analytics** — Visual overview of your financial health with charts and summaries
- **Transaction Management** — Create, edit, and delete income/expense entries
- **Category Tracking** — Organize transactions by category for better insights
- **Modern UI** — Clean, responsive dashboard interface

## ℹ️ Overview

**Expense Tracker MERN** is a full-stack web application that helps users manage their personal finances. Built with the MERN stack, it provides a complete expense tracking solution with a RESTful API backend and a React-based frontend dashboard.

The application allows you to:
- Record income and expense transactions
- Categorize spending for better tracking
- View financial summaries and trends
- Manage your budget effectively

### ✍️ Author

This project was built by **SwagBoy3000** to demonstrate proficiency in full-stack JavaScript development, RESTful API design, and modern web application architecture.

## Quick Start

```bash
# Backend Setup
cd Backend
npm install
npm start

# Frontend Setup (in a new terminal)
cd Frontend/expense_tracker
npm install
npm run dev
```

## Features

### 📊 **Dashboard**
- Financial summary overview
- Income and expense breakdowns
- Visual charts and analytics

### 💳 **Transaction Management**
- Add new income/expense entries
- Edit existing transactions
- Delete transactions
- Categorize transactions

### 🔒 **Security Features**
- Input validation and error handling
- MongoDB injection protection via Mongoose

### 📦 **Database Model**
- Transaction schema with fields for amount, category, description, type (income/expense), and timestamps
- User authentication-ready structure

### ⚛️ **Frontend**
- React with modern hooks
- Vite for fast development
- Clean component architecture
- Responsive dashboard UI

## ⬇️ Installation

### Requirements
- Node.js 16.0 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string

# Start the server
npm start
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd Frontend/expense_tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure

```
ExpenseTracker_MERN/
├── Backend/
│   └── src/
│       ├── config/          # Database configuration
│       ├── controllers/     # CRUD operations
│       ├── models/          # Transaction schema
│       ├── routes/          # API routes
│       └── server.js        # Express server
├── Frontend/
│   └── expense_tracker/
│       └── src/
│           ├── components/  # Reusable UI components
│           ├── pages/       # Dashboard and transaction pages
│           └── App.jsx      # Main application
└── .gitignore
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| MongoDB | Database |
| Express.js | Backend framework |
| React | Frontend library |
| Node.js | Runtime environment |
| Mongoose | MongoDB ODM |
| Vite | Build tool |

---

*Made with ❤️ by [SwagBoy3000](https://github.com/SwagBoy3000)*
