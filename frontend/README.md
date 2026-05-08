# CRM Frontend (React + Tailwind + Material UI)

Frontend application for CRM system to manage leads, notes, and dashboard.


# Tech Stack

- React.js
- Tailwind CSS
- Material UI
- Axios
- React Router DOM


# Project Structure

frontend/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── context/
│   ├── routes/
│   ├── App.js
│   └── index.js


# Features

Authentication:
- Login page
- JWT token storage
- Protected routes
- Logout

Dashboard:
- Total leads
- New leads
- Qualified leads
- Won leads
- Lost leads

Leads Management:
- Create lead
- View leads
- Edit lead
- Delete lead
- Update status

Lead Details:
- View lead info
- Add notes
- View notes list

Search & Filter:
- Search leads
- Filter by status
- Filter by source
- Filter by salesperson


# Setup

npm install
npm start

Frontend runs on:
http://localhost:3000


# Backend Connection

REACT_APP_API_URL=http://localhost:5000/api


# Default Login

email: admin@example.com
password: password123


# API Usage

axios.get(API_URL + "/leads", {
  headers: {
    Authorization: "Bearer token"
  }
});