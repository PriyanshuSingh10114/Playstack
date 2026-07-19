<div align="center">
  <img src="https://via.placeholder.com/150/000000/FFFFFF/?text=PeopleFlow" alt="PeopleFlow Logo" width="150" height="150">
  
  <h1>PeopleFlow EMS</h1>
  
  <p><strong>Enterprise Employee Management System with Secure Authentication, Role-Based Access Control & Organizational Hierarchy</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  </p>
</div>

---

## 🚀 Project Overview

PeopleFlow is a premium, enterprise-grade Employee Management System (EMS) designed to streamline HR processes, manage organizational hierarchies, and provide secure role-based access control. Built with a modern MERN stack and a sleek, SaaS-inspired UI.

## ✨ Features

- **Secure Authentication**: JWT-based auth with access and refresh tokens, HTTP-only cookies, and bcrypt password hashing.
- **Role-Based Access Control (RBAC)**: Distinct permissions for Super Admin, HR Manager, and Employees.
- **Employee Management**: Complete CRUD operations with pagination, search, and soft delete functionality.
- **Organization Hierarchy**: Visual interactive tree representing the company's reporting structure.
- **Interactive Dashboard**: Real-time statistics and Recharts-powered data visualization.
- **Premium UI/UX**: Built with React, Tailwind CSS, shadcn/ui, and Framer Motion for smooth animations and dark mode support.
- **Advanced Uploads**: Cloudinary integration for profile image management.
- **Data Export**: Seamless CSV export for employee records.

## 🛠️ Tech Stack

### Frontend
- React.js 19 + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- React Router DOM + React Hook Form + Zod
- TanStack Query (React Query)
- Framer Motion + Recharts + Lucide React

### Backend
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose (Repository Pattern)
- JWT Authentication + bcrypt
- Multer + Cloudinary
- express-validator + Helmet + CORS + Morgan

## 📁 Folder Structure

```text
peopleflow-ems/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── layouts/        # Application layouts (Sidebar, etc.)
│   │   ├── pages/          # Route components
│   │   ├── lib/            # Utilities and Axios config
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main router
├── server/                 # Backend Node.js Application
│   ├── src/
│   │   ├── config/         # Environment and DB config
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Auth, Error, Rate Limiting
│   │   ├── models/         # Mongoose Schemas
│   │   ├── repositories/   # Database access layer
│   │   ├── routes/         # Express routes
│   │   ├── services/       # Business logic layer
│   │   ├── types/          # TypeScript definitions
│   │   └── server.ts       # Application entry point
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account (or local MongoDB)
- Cloudinary Account
- Docker (optional)

### Environment Variables

**Client (`client/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
```

**Server (`server/.env`)**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running Locally (Without Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/PriyanshuSingh10114/Playstack.git
   cd Playstack
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Client**
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Running with Docker

```bash
docker-compose up --build
```

### Seeding the Database

To create initial Admin and HR Manager accounts:
```bash
cd server
npx ts-node src/scripts/seed.ts
```

## 🔒 Role-Based Access Control

- **Super Admin**: Full system access (Create, Edit, Delete, Soft Delete, Restore, Assign Roles).
- **HR Manager**: Can Create, Edit, and View employees, but cannot delete or assign Super Admin roles.
- **Employee**: Can view own profile, update personal details and profile image. Cannot view other employees or edit salary/role.

## 🚀 Deployment Guide

- **Frontend (Vercel)**: Connect the GitHub repository to Vercel, select the `client` directory as the root, and set the build command to `npm run build`.
- **Backend (Render)**: Create a new Web Service on Render, connect the repo, set the root directory to `server`, build command to `npm install && npm run build`, and start command to `npm start`. Add all environment variables.
- **Database**: Use MongoDB Atlas for production data storage.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Priyanshu Singh**
- GitHub: [@PriyanshuSingh10114](https://github.com/PriyanshuSingh10114)
