-- Create Tables for Educational Consultancy CRM

-- Admin Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Schools Table
CREATE TABLE IF NOT EXISTS schools (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  contact_person VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Consultants/Teachers Table
CREATE TABLE IF NOT EXISTS consultants (
  id SERIAL PRIMARY KEY,
  school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  specialization VARCHAR(255),
  bio TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(20),
  is_approved BOOLEAN DEFAULT FALSE,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  school_id INTEGER REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  program_name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, under_review, accepted, rejected
  notes TEXT,
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  consultant_id INTEGER REFERENCES consultants(id) ON DELETE CASCADE NOT NULL,
  appointment_date TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected, completed, cancelled
  notes TEXT,
  meeting_link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_consultants_school ON consultants(school_id);
CREATE INDEX IF NOT EXISTS idx_consultants_email ON consultants(email);
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_applications_student ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_school ON applications(school_id);
CREATE INDEX IF NOT EXISTS idx_appointments_student ON appointments(student_id);
CREATE INDEX IF NOT EXISTS idx_appointments_consultant ON appointments(consultant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
