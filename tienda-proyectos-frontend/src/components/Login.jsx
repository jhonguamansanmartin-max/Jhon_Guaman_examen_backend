import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError('Credenciales incorrectas');
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      onLogin(data.rol);
    } catch {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.button} type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: '#16213e', padding: '2.5rem', borderRadius: '12px',
    border: '2px solid #0f3460', width: '360px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
  },
  title: { color: '#e94560', textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.8rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: {
    padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #0f3460',
    backgroundColor: '#0f3460', color: '#fff', fontSize: '1rem', outline: 'none',
  },
  button: {
    padding: '0.75rem', borderRadius: '8px', border: 'none',
    backgroundColor: '#e94560', color: '#fff', fontSize: '1rem',
    cursor: 'pointer', fontWeight: 'bold',
  },
  error: { color: '#ff6b6b', textAlign: 'center', margin: 0 },
};
