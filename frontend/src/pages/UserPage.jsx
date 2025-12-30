import { useEffect, useState } from 'react';
import { byDate } from '../api/attendance';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export default function UserPage() {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const { data } = await byDate(date);
        setRecords(data);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load attendance');
        }
      }
    };

    fetchData();
  }, [date, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
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
      {/* Header with title and logout button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h2
          style={{
            fontSize: '26px',
            fontWeight: '700',
            color: '#2c3e50'
          }}
        >
          Sri Sakthi Nursing College Karur — Attendance
        </h2>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            background: '#e74c3c',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={e => (e.target.style.background = '#c0392b')}
          onMouseLeave={e => (e.target.style.background = '#e74c3c')}
        >
          Logout
        </button>
      </div>

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
            marginLeft: '10px',
            outline: 'none',
            transition: 'border 0.3s ease'
          }}
          onFocus={e => (e.target.style.border = '1px solid #3498db')}
          onBlur={e => (e.target.style.border = '1px solid #ccc')}
        />
      </label>

      {error && (
        <p style={{ color: 'red', fontWeight: '600', textAlign: 'center' }}>
          {error}
        </p>
      )}

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
          {records.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  fontStyle: 'italic',
                  color: '#7f8c8d'
                }}
              >
                No records found for {date}
              </td>
            </tr>
          ) : (
            records.map(r => (
              <tr
                key={r._id}
                style={{
                  borderBottom: '1px solid #eee',
                  textAlign: 'center',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={e =>
                  (e.currentTarget.style.background = '#f9f9f9')
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                <td style={{ padding: '10px' }}>{r.studentId?.rollNumber}</td>
                <td style={{ padding: '10px' }}>{r.studentId?.name}</td>
                <td style={{ padding: '10px' }}>{r.studentId?.department}</td>
                <td style={{ padding: '10px' }}>{r.studentId?.section}</td>
                <td
                  style={{
                    padding: '10px',
                    fontWeight: '600',
                    color: r.status === 'Present' ? '#27ae60' : '#e74c3c'
                  }}
                >
                  {r.status}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}