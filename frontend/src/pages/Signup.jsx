import { useState } from 'react';
import { signup } from '../api/auth';   // ✅ use signup
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('staff'); // ✅ default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await signup({ name, email, password, role });

      if (data.token) localStorage.setItem('token', data.token);
      if (data.role) localStorage.setItem('role', data.role);

      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '60px auto',
        padding: '30px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #f0f4ff, #e6f7ff)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '20px'
        }}
      >
        Sign Up
      </h2>

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '15px' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            outline: 'none',
            transition: 'border 0.3s ease'
          }}
          onFocus={e => (e.target.style.border = '1px solid #3498db')}
          onBlur={e => (e.target.style.border = '1px solid #ccc')}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            outline: 'none',
            transition: 'border 0.3s ease'
          }}
          onFocus={e => (e.target.style.border = '1px solid #3498db')}
          onBlur={e => (e.target.style.border = '1px solid #ccc')}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            outline: 'none',
            transition: 'border 0.3s ease'
          }}
          onFocus={e => (e.target.style.border = '1px solid #3498db')}
          onBlur={e => (e.target.style.border = '1px solid #ccc')}
        />

        {/* ✅ Role selection */}
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '14px',
            background: '#f9f9f9',
            cursor: 'pointer'
          }}
        >
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
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
          Sign Up
        </button>
        {error && (
          <p style={{ color: 'red', fontWeight: '600', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{
            background: 'none',
            border: 'none',
            color: '#3498db',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
}