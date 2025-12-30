import { useEffect, useState } from 'react';
import { listStudents, deleteStudent } from '../api/students';
import { Link } from 'react-router-dom';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await listStudents({ q });
      setStudents(data);
    };
    fetchData();
  }, [q]);

  const onDelete = async (id) => {
    await deleteStudent(id);
    const { data } = await listStudents({ q });
    setStudents(data);
  };

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '900px',
        margin: '40px auto',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #f0f4ff, #e6f7ff)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
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
        Students
      </h3>

      <input
        placeholder="Search..."
        value={q}
        onChange={e => setQ(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
          marginBottom: '20px',
          outline: 'none',
          transition: 'border 0.3s ease'
        }}
        onFocus={e => (e.target.style.border = '1px solid #3498db')}
        onBlur={e => (e.target.style.border = '1px solid #ccc')}
      />

      <table
        style={{
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
            <th style={{ padding: '12px' }}>Dept</th>
            <th style={{ padding: '12px' }}>Year</th>
            <th style={{ padding: '12px' }}>Section</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr
              key={s._id}
              style={{
                borderBottom: '1px solid #eee',
                textAlign: 'center',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f9f9f9')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <td style={{ padding: '10px' }}>{s.rollNumber}</td>
              <td style={{ padding: '10px' }}>{s.name}</td>
              <td style={{ padding: '10px' }}>{s.department}</td>
              <td style={{ padding: '10px' }}>{s.year}</td>
              <td style={{ padding: '10px' }}>{s.section}</td>
              <td style={{ padding: '10px' }}>
                <Link
                  to={`/admin/students/${s._id}`}
                  style={{
                    color: '#3498db',
                    textDecoration: 'none',
                    fontWeight: '600',
                    marginRight: '10px'
                  }}
                  onMouseEnter={e => (e.target.style.textDecoration = 'underline')}
                  onMouseLeave={e => (e.target.style.textDecoration = 'none')}
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(s._id)}
                  style={{
                    padding: '6px 12px',
                    background: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'background 0.3s ease'
                  }}
                  onMouseEnter={e => (e.target.style.background = '#c0392b')}
                  onMouseLeave={e => (e.target.style.background = '#e74c3c')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}