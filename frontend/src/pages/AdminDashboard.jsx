import { Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import AttendanceMarking from './AttendanceMarking';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const containerStyle = {
    padding: '30px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f4ff, #e6f7ff)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: '1px'
  };

  const logoutButtonStyle = {
    padding: '8px 16px',
    background: '#e74c3c',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease'
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px'
  };

  const linkStyle = {
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '600',
    color: '#34495e',
    padding: '10px 18px',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  };

  const contentStyle = {
    background: '#fff',
    borderRadius: '10px',
    padding: '25px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Sri Sakthi Nursing College Karur — Admin</h2>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={e => (e.target.style.background = '#c0392b')}
          onMouseLeave={e => (e.target.style.background = '#e74c3c')}
        >
          Logout
        </button>
      </div>

      <nav style={navStyle}>
        <Link to="students" style={linkStyle}>Students</Link>
        <Link to="students/new" style={linkStyle}>Add Student</Link>
        <Link to="attendance" style={linkStyle}>Mark Attendance</Link>
      </nav>

      <div style={contentStyle}>
        <Routes>
          <Route path="students" element={<StudentList />} />
          <Route path="students/new" element={<StudentForm />} />
          <Route path="students/:id" element={<StudentForm edit />} />
          <Route path="attendance" element={<AttendanceMarking />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}