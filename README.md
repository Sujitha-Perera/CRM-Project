# CRM Full Stack Project (Backend + Frontend)

This project is a simple CRM (Customer Relationship Management) system built using:

Backend:
- Node.js
- Express.js
- MySQL
- JWT Authentication

Frontend:
- React.js
- Tailwind CSS
- Material UI
- Axios



# Project Structure

crm-project/
│
├── backend/
├── frontend/

---

# Prerequisites

Install before running project:

- Node.js (v16+)
- MySQL Server
- Git



# 1. Database Setup

Open MySQL and run:

CREATE DATABASE crm_db;

USE crm_db;

Create tables using backend SQL schema (see backend README).



# 2. Backend Setup

cd backend
npm install

Create .env file:

PORT=5000
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=crm_db
JWT_SECRET=crm_secret_key

Run backend:

npm run dev

Backend runs at:
http://localhost:5000

---

# 3. Create Admin User

Run:

node createUser.js

Login:
email: admin@example.com
password: password123



# 4. Frontend Setup

cd frontend
npm install

Run frontend:

npm run dev

Frontend runs at:
http://localhost:3000



# 5. How System Works

Frontend → API Calls → Backend → MySQL Database → Response → Frontend UI



# 7. API Base URL

http://localhost:5000/api


# 8. Default Login

email: admin@example.com
password: password123

# 9. Notes

- Make sure MySQL is running
- Backend must start before frontend
- Check .env files properly

# 10. Known Limitations

- The application does not include full role-based access control (admin/user separation is not fully implemented)
- Pagination is not implemented, so all leads are loaded at once which may affect performance for large datasets
- The project is not deployed and currently runs only in a local environment

# 11. Reflection Note

During this CRM project, I learned how to build a full-stack application using React, Node.js, Express, and MySQL. I understood how frontend and backend communicate through APIs and how JWT authentication works.

I faced challenges with database connection and authentication handling, which I solved by debugging environment variables and testing APIs using Postman.

This project helped me understand real-world CRM systems such as lead management, notes handling, and dashboard analytics. I also improved my skills in MVC architecture and responsive UI development using Tailwind CSS and Material UI.