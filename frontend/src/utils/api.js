const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = {
  // Auth endpoints
  adminLogin: (email, password) =>
    fetch(`${API_URL}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  studentRegister: (full_name, email, password, date_of_birth, phone) =>
    fetch(`${API_URL}/auth/student/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name,
        email,
        password,
        date_of_birth,
        phone,
      }),
    }).then((r) => r.json()),

  studentLogin: (email, password) =>
    fetch(`${API_URL}/auth/student/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  consultantRegister: (
    full_name,
    email,
    password,
    school_id,
    specialization,
    bio,
  ) =>
    fetch(`${API_URL}/auth/consultant/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name,
        email,
        password,
        school_id,
        specialization,
        bio,
      }),
    }).then((r) => r.json()),

  consultantLogin: (email, password) =>
    fetch(`${API_URL}/auth/consultant/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  // Public endpoints (no auth required)
  getPublicSchools: () =>
    fetch(`${API_URL}/auth/schools`).then((r) => r.json()),

  // Admin endpoints
  getUnapprovedStudents: (token) =>
    fetch(`${API_URL}/admin/students/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  approveStudent: (token, studentId) =>
    fetch(`${API_URL}/admin/students/${studentId}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  rejectStudent: (token, studentId) =>
    fetch(`${API_URL}/admin/students/${studentId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  getUnapprovedConsultants: (token) =>
    fetch(`${API_URL}/admin/consultants/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  approveConsultant: (token, consultantId) =>
    fetch(`${API_URL}/admin/consultants/${consultantId}/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  rejectConsultant: (token, consultantId) =>
    fetch(`${API_URL}/admin/consultants/${consultantId}/reject`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  // Schools
  getAllSchools: (token) =>
    fetch(`${API_URL}/admin/schools`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  createSchool: (token, schoolData) =>
    fetch(`${API_URL}/admin/schools`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(schoolData),
    }).then((r) => r.json()),

  updateSchool: (token, schoolId, schoolData) =>
    fetch(`${API_URL}/admin/schools/${schoolId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(schoolData),
    }).then((r) => r.json()),

  deleteSchool: (token, schoolId) =>
    fetch(`${API_URL}/admin/schools/${schoolId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  // Students
  getAllStudents: (token) =>
    fetch(`${API_URL}/admin/students`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  deleteStudent: (token, studentId) =>
    fetch(`${API_URL}/admin/students/${studentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  // Consultants
  getAllConsultants: (token) =>
    fetch(`${API_URL}/admin/consultants`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  deleteConsultant: (token, consultantId) =>
    fetch(`${API_URL}/admin/consultants/${consultantId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  // Applications
  getApplications: (token) =>
    fetch(`${API_URL}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  getStudentApplications: (token, studentId) =>
    fetch(`${API_URL}/applications/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  createApplication: (token, appData) =>
    fetch(`${API_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appData),
    }).then((r) => r.json()),

  updateApplication: (token, appId, appData) =>
    fetch(`${API_URL}/applications/${appId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appData),
    }).then((r) => r.json()),

  // Appointments
  getConsultants: (token) =>
    fetch(`${API_URL}/appointments/consultants`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  scheduleAppointment: (token, appointmentData) =>
    fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(appointmentData),
    }).then((r) => r.json()),

  getStudentAppointments: (token, studentId) =>
    fetch(`${API_URL}/appointments/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  getConsultantAppointments: (token, consultantId) =>
    fetch(`${API_URL}/appointments/consultant/${consultantId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  acceptAppointment: (token, appointmentId, meetingLink) =>
    fetch(`${API_URL}/appointments/${appointmentId}/accept`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ meeting_link: meetingLink }),
    }).then((r) => r.json()),

  denyAppointment: (token, appointmentId, notes) =>
    fetch(`${API_URL}/appointments/${appointmentId}/deny`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notes }),
    }).then((r) => r.json()),
};

export default api;
