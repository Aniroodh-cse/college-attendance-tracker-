import { useEffect, useState } from 'react';
import { listStudents } from '../api/students';
import { markAttendance } from '../api/attendance';
import dayjs from 'dayjs';

export default function AttendanceMarking() {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [statusMap, setStatusMap] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Load active students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await listStudents({ status: 'active' });
        setStudents(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load students');
      }
    };
    fetchStudents();
  }, []);

  // Update status for a student
  const setStatus = (id, status) => {
    setStatusMap(prev => ({ ...prev, [id]: status }));
  };

  // ✅ Submit attendance for all students
  const onSubmit = async () => {
    setMessage('');
    setError('');
    try {
      await markAttendance({
        date, // must be in 'YYYY-MM-DD' format
        records: students.map(s => ({
          studentId: s._id,
          status: statusMap[s._id] || 'Present'
        }))
      });

      setMessage('Attendance marked successfully. SMS sent for absent students.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error marking attendance');
    }
  };

  return (
    <div
      style={{
        padding: '30px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4ff, #e6f7ff)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '20px'
        }}
      >
        Mark Attendance
      </h3>

      <label
        style={{
          display: 'block',
          marginBottom: '20px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#34495e'
        }}
      >
        Date:{' '}
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
            marginLeft: '10px'
          }}
        />
      </label>

      {error && <p style={{ color: 'red', fontWeight: '600' }}>{error}</p>}
      {message && <p style={{ color: 'green', fontWeight: '600' }}>{message}</p>}

      <table
        style={{
          marginTop: '12px',
          width: '100%',
          borderCollapse: 'collapse',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <thead style={{ background: '#3498db', color: '#fff' }}>
          <tr>
            <th style={{ padding: '12px' }}>Roll</th>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Department</th>
            <th style={{ padding: '12px' }}>Section</th>
            <th style={{ padding: '12px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No students found
              </td>
            </tr>
          ) : (
            students.map(s => (
              <tr
                key={s._id}
                style={{
                  borderBottom: '1px solid #eee',
                  textAlign: 'center'
                }}
              >
                <td style={{ padding: '10px' }}>{s.rollNumber}</td>
                <td style={{ padding: '10px' }}>{s.name}</td>
                <td style={{ padding: '10px' }}>{s.department}</td>
                <td style={{ padding: '10px' }}>{s.section}</td>
                <td style={{ padding: '10px' }}>
                  <select
                    value={statusMap[s._id] || 'Present'}
                    onChange={e => setStatus(s._id, e.target.value)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                      fontSize: '14px',
                      background: '#f9f9f9'
                    }}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button
        onClick={onSubmit}
        style={{
          marginTop: '20px',
          display: 'block',
          width: '100%',
          padding: '12px',
          background: '#3498db',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => (e.target.style.background = '#2980b9')}
        onMouseLeave={e => (e.target.style.background = '#3498db')}
      >
        Submit Attendance
      </button>
    </div>
  );
}