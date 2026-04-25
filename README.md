# Educational Consultancy CRM

A comprehensive PERN stack (PostgreSQL, Express, React, Node.js) application for managing educational consultancy services with Bootstrap styling.

## Features

### Admin Panel

- ✅ Approve/Reject student and consultant registrations
- ✅ Manage schools (Create, Read, Update, Delete)
- ✅ View and manage all students
- ✅ View and manage all consultants
- ✅ Track and manage student applications
- ✅ Update application statuses

### Student Portal

- ✅ User registration with account approval workflow
- ✅ Create and track school applications
- ✅ Schedule appointments with consultants
- ✅ View and manage scheduled appointments
- ✅ View appointment details and meeting links

### Consultant Portal

- ✅ User registration with account approval workflow
- ✅ View pending appointment requests
- ✅ Accept appointments with meeting link
- ✅ Reject appointments with notes
- ✅ View all past and accepted appointments

### Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (Admin, Student, Consultant)
- ✅ Account approval workflow
- ✅ Protected API endpoints

## Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend

- **React** - UI library
- **React Router** - Client-side routing
- **Bootstrap** - CSS framework
- **React-Bootstrap** - Bootstrap components for React

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create .env file:**

   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables in .env:**

   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=educational_crm
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRY=7d
   PORT=5000
   NODE_ENV=development
   ```

5. **Create PostgreSQL database:**

   ```bash
   createdb educational_crm
   ```

6. **Initialize database schema:**

   ```bash
   psql -U postgres -d educational_crm -f config/schema.sql
   ```

7. **Create initial admin account (in PostgreSQL):**

   ```sql
   INSERT INTO admins (name, email, password)
   VALUES ('Admin', 'admin@example.com', '$2a$10$YourHashedPasswordHere');
   ```

   To generate a hashed password, you can use Node.js:

   ```node
   const bcrypt = require("bcryptjs");
   bcrypt.hash("password123", 10, (err, hash) => console.log(hash));
   ```

8. **Start the backend server:**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the React application:**
   ```bash
   npm start
   ```
   Application will open at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/student/register` - Student registration
- `POST /api/auth/student/login` - Student login
- `POST /api/auth/consultant/register` - Consultant registration
- `POST /api/auth/consultant/login` - Consultant login

### Admin Endpoints

- `GET /api/admin/students/pending` - Get pending student approvals
- `POST /api/admin/students/:studentId/approve` - Approve student
- `POST /api/admin/students/:studentId/reject` - Reject student
- `GET /api/admin/consultants/pending` - Get pending consultant approvals
- `POST /api/admin/consultants/:consultantId/approve` - Approve consultant
- `POST /api/admin/consultants/:consultantId/reject` - Reject consultant
- `GET /api/admin/schools` - Get all schools
- `POST /api/admin/schools` - Create school
- `PUT /api/admin/schools/:schoolId` - Update school
- `DELETE /api/admin/schools/:schoolId` - Delete school
- `GET /api/admin/students` - Get all students
- `DELETE /api/admin/students/:studentId` - Delete student
- `GET /api/admin/consultants` - Get all consultants
- `DELETE /api/admin/consultants/:consultantId` - Delete consultant

### Applications Endpoints

- `GET /api/applications` - Get all applications (admin only)
- `GET /api/applications/student/:studentId` - Get student's applications
- `POST /api/applications` - Create application
- `PUT /api/applications/:applicationId` - Update application status

### Appointments Endpoints

- `GET /api/appointments/consultants` - Get all consultants
- `POST /api/appointments` - Schedule appointment
- `GET /api/appointments/student/:studentId` - Get student's appointments
- `GET /api/appointments/consultant/:consultantId` - Get consultant's appointments
- `PUT /api/appointments/:appointmentId/accept` - Accept appointment
- `PUT /api/appointments/:appointmentId/deny` - Deny appointment

## Database Schema

### Tables

- **admins** - Administrator accounts
- **schools** - Partner schools
- **consultants** - School consultants/teachers
- **students** - Student users
- **applications** - Student school applications
- **appointments** - Scheduled appointments between students and consultants

## Default Login Credentials

### Admin

- Email: `admin@example.com`
- Password: (use hashed password from setup step 7)

### Test Student

After registering, wait for admin approval before logging in.

### Test Consultant

After registering and being assigned to a school, wait for admin approval before logging in.

## Workflow

### Student Registration & Login

1. Student registers on the app
2. Admin approves the registration
3. Student can login and access the portal
4. Student can create applications to schools
5. Student can schedule appointments with consultants

### Consultant Registration & Login

1. Consultant registers on the app
2. Associates with a school
3. Admin approves the registration
4. Consultant can login and access the portal
5. Consultant can view and manage appointment requests

### Appointment Flow

1. Student schedules appointment with consultant
2. Consultant receives pending appointment notification
3. Consultant can accept (with meeting link) or reject appointment
4. Student can view appointment status and meeting details

## Styling

The application uses **Bootstrap 5** with React-Bootstrap components for a clean, responsive UI across all pages and components.

## File Structure

```
Educational-Consultancy-CRM/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── schema.sql
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── adminController.js
│   │   ├── applicationController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── applicationRoutes.js
│   │   └── appointmentRoutes.js
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── AdminApprovals.js
│   │   │   ├── AdminSchools.js
│   │   │   ├── AdminStudents.js
│   │   │   ├── AdminConsultants.js
│   │   │   ├── AdminApplications.js
│   │   │   ├── StudentApplications.js
│   │   │   ├── StudentAppointments.js
│   │   │   └── ConsultantAppointments.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── StudentDashboard.js
│   │   │   └── ConsultantDashboard.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .gitignore
└── README.md
```

## Future Enhancements

- Email notifications for approvals and appointment scheduling
- Document upload for applications
- Video conferencing integration
- Application timeline view
- Export reports
- Payment integration
- More detailed consultant profiles
- Appointment reminders
- Advanced filtering and search

## Support

For issues or questions, please check the database connection and ensure all environment variables are properly configured.

---

**Version:** 1.0.0  
**Last Updated:** 2026-04-25
