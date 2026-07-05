import { useState } from 'react';

export default function CrearProyecto({ rol }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setErrorMsg(''); setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/proyectos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nombre, descripcion, fechaInicio }),
      });
      if (res.status === 403) {
        setErrorMsg('⛔ Acceso denegado: no tienes permisos para realizar esta acción (403 Forbidden)');
        setLoading(false); return;
      }
      if (!res.ok) { setErrorMsg('Error al crear el proyecto'); setLoading(false); return; }
      setMensaje('Proyecto creado exitosamente');
      setNombre(''); setDescripcion(''); setFechaInicio('');
    } catch {
      setErrorMsg('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  if (rol !== 'ADMIN') {
    return (
      <div style={styles.page}>
        <div style={styles.deniedCard}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <h3 style={{ color: '#f87171', marginBottom: '0.5rem' }}>Acceso Restringido</h3>
          <p style={{ color: '#94a3b8' }}>Solo usuarios con rol ADMIN pueden gestionar proyectos.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>📁 Gestionar Proyectos</h2>
        <p style={styles.subtitle}>Crea y administra proyectos del sistema</p>
      </div>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Nuevo Proyecto</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Nombre del Proyecto</label>
            <input style={styles.input} placeholder="Ej: Sistema de Ventas" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Descripción</label>
            <textarea
              style={{ ...styles.input, resize: 'vertical', minHeight: '80px' }}
              placeholder="Describe brevemente el proyecto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Fecha de Inicio</label>
            <input style={styles.input} type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
          </div>
          {mensaje && (
            <div style={styles.successBox}>
              <span>✅</span> {mensaje}
            </div>
          )}
          {errorMsg && (
            <div style={styles.errorBox}>
              <span>⚠️</span> {errorMsg}
            </div>
          )}
          <button style={loading ? { ...styles.button, opacity: 0.7 } : styles.button} type="submit" disabled={loading}>
            {loading ? 'Guardando...' : '+ Crear Proyecto'}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: '2rem 2.5rem' },
  header: { marginBottom: '1.5rem' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.25rem' },
  subtitle: { color: '#64748b', fontSize: '0.9rem' },
  card: {
    backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155',
    padding: '2rem', maxWidth: '560px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  cardTitle: { color: '#e2e8f0', fontWeight: '600', marginBottom: '1.5rem', fontSize: '1.05rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.8rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: {
    padding: '0.75rem 1rem', backgroundColor: '#0f172a', border: '1px solid #334155',
    borderRadius: '10px', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', width: '100%',
  },
  successBox: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
    color: '#86efac', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem',
  },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.9rem',
  },
  button: {
    padding: '0.875rem', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff', fontSize: '0.95rem', cursor: 'pointer', fontWeight: '600',
    boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
  },
  deniedCard: {
    backgroundColor: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)',
    borderRadius: '14px', padding: '3rem', textAlign: 'center', maxWidth: '400px',
  },
};
