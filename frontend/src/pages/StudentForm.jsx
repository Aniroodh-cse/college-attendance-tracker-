import { useEffect, useState } from 'react';
import { createStudent, getStudent, updateStudent } from '../api/students';
import { useNavigate, useParams } from 'react-router-dom';

export default function StudentForm({ edit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    rollNumber: '',
    name: '',
    department: '',
    year: 1,
    section: '',
    parentName: '',
    parentPhone: '+91',
    status: 'active'
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (edit && id) {
      getStudent(id).then(({ data }) => setForm(data));
    }
  }, [edit, id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (edit) {
        await updateStudent(id, form);
      } else {
        await createStudent(form);
      }
      navigate('/admin/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '500px',
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
          fontSize: '22px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '20px'
        }}
      >
        {edit ? 'Edit Student' : 'Add Student'}
      </h3>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '15px' }}>
        <input
          value={form.rollNumber}
          onChange={e => set('rollNumber', e.target.value)}
          placeholder="Roll number"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <input
          value={form.name}
          onChange={e => set('name', e.target.value)}
          placeholder="Name"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          value={form.department}
          onChange={e => set('department', e.target.value)}
          placeholder="Department"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          type="number"
          value={form.year}
          onChange={e => set('year', Number(e.target.value))}
          placeholder="Year"
          min="1"
          max="4"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          value={form.section}
          onChange={e => set('section', e.target.value)}
          placeholder="Section"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          value={form.parentName}
          onChange={e => set('parentName', e.target.value)}
          placeholder="Parent name"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <input
          value={form.parentPhone}
          onChange={e => set('parentPhone', e.target.value)}
          placeholder="Parent phone (+91XXXXXXXXXX)"
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        />
        <select
          value={form.status}
          onChange={e => set('status', e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            background: '#f9f9f9',
            cursor: 'pointer'
          }}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          style={{
            padding: '12px',
            background: '#3498db',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={e => (e.target.style.background = '#2980b9')}
          onMouseLeave={e => (e.target.style.background = '#3498db')}
        >
          {edit ? 'Update' : 'Create'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', fontWeight: '600', textAlign: 'center', marginTop: '15px' }}>
          {error}
        </p>
      )}
    </div>
  );
}