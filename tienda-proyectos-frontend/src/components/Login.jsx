import { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setError('Credenciales incorrectas. Verifique usuario y contraseña.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('rol', data.rol);
      onLogin(data.rol);
    } catch {
      setError('No se pudo conectar con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.bg1} />
      <div style={styles.bg2} />
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>⚡</div>
          <h1 style={styles.logoText}>ProyectosApp</h1>
        </div>
        <h2 style={styles.title}>Bienvenido</h2>
        <p style={styles.subtitle}>Inicia sesión para continuar</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Usuario</label>
            <div style={styles.inputWrap}>
              <span style={styles.icon}>👤</span>
              <input
                style={styles.input}
                type="text"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrap}>
              <span style={styles.icon}>🔒</span>
              <input
                style={styles.input}
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <div style={styles.errorBox}>
              <span>⚠️</span> {error}
            </div>
          )}
          <button style={loading ? { ...styles.button, opacity: 0.7 } : styles.button} type="submit" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    minHeight: '100vh', backgroundColor: '#0f172a', position: 'relative', overflow: 'hidden',
  },
  bg1: {
    position: 'absolute', width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
    top: '-100px', left: '-100px', pointerEvents: 'none',
  },
  bg2: {
    position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
    bottom: '-50px', right: '-50px', pointerEvents: 'none',
  },
  card: {
    backgroundColor: '#1e293b', padding: '2.5rem', borderRadius: '20px',
    border: '1px solid #334155', width: '420px', position: 'relative', zIndex: 1,
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
  },
  logoWrap: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' },
  logoIcon: { fontSize: '1.8rem' },
  logoText: { fontSize: '1.3rem', fontWeight: '700', color: '#6366f1' },
  title: { fontSize: '1.8rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.25rem' },
  subtitle: { color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '0.875rem', fontSize: '1rem', zIndex: 1 },
  input: {
    width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem',
    backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '10px',
    color: '#e2e8f0', fontSize: '0.95rem', outline: 'none', transition: 'border-color 0.2s',
  },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem',
  },
  button: {
    padding: '0.875rem', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99,102,241,0.4)', transition: 'opacity 0.2s',
  },
};
