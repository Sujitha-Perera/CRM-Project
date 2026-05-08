# CRM Backend (Node.js + Express + MySQL)

A backend system for CRM application handling authentication, leads, notes, and dashboard.


# Tech Stack

- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs
- dotenv



# Project Structure

backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── app.js
│   └── server.js
├── createUser.js
├── package.json
└── .env

---

# Features

Authentication:
- Login with JWT
- Protected routes

Leads:
- Create lead
- Get all leads
- Get single lead
- Update lead
- Delete lead

Notes:
- Add notes to leads
- Get notes by lead

Dashboard:
- Total leads
- New leads
- Qualified leads
- Won leads
- Lost leads
- Deal statistics


# Database Setup

CREATE DATABASE crm_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255)
);

CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_name VARCHAR(255),
  company_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  lead_source VARCHAR(100),
  salesperson VARCHAR(100),
  status VARCHAR(50),
  deal_value INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lead_id INT,
  content TEXT,
  created_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



# Environment Variables

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=crm_db
JWT_SECRET=crm_secret_key


# Setup

npm install
npm run dev

Server runs on:
http://localhost:5000



# Create Admin User

run this command:node createUser.js

Frontend - Login:

email: admin@example.com
password: password123


# API Endpoints

Auth:
POST /api/auth/login

Leads:
GET /api/leads
GET /api/leads/:id
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id

Notes:
GET /api/notes/:leadId
POST /api/notes
DELETE /api/notes/:id


Dashboard:
GET /api/dashboard



# Authentication

Use:
Authorization: Bearer token