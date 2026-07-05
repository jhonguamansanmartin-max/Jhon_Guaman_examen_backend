import { useState } from 'react';

const PRIORIDADES = ['ALTA', 'MEDIA', 'BAJA'];
const PRIORIDAD_COLORS = {
  ALTA: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', color: '#fca5a5' },
  MEDIA: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', color: '#fcd34d' },
  BAJA: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', color: '#86efac' },
};

export default function CrearTarea() {
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [costoEstimado, setCostoEstimado] = useState('');
  const [prioridad, setPrioridad] = useState('ALTA');
  const [proyectoId, setProyectoId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(''); setErrorMsg(''); setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          descripcion, fechaLimite,
          costoEstimado: parseFloat(costoEstimado),
          prioridad,
          proyecto: { id: parseInt(proyectoId) },
          empleados: [],
        }),
      });
      if (res.status === 403) { setErrorMsg('⛔ Acceso denegado (403 Forbidden)'); setLoading(false); return; }
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || 'Error al crear tarea'); setLoading(false); return; }
      setMensaje('Tarea creada exitosamente');
      setDescripcion(''); setFechaLimite(''); setCostoEstimado(''); setProyectoId('');
    } catch {
      setErrorMsg('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const pc = PRIORIDAD_COLORS[prioridad];

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>✅ Crear Tarea</h2>
        <p style={styles.subtitle}>Asigna tareas a los proyectos del sistema</p>
      </div>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Nueva Tarea</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Descripción</label>
            <textarea
              style={{ ...styles.input, resize: 'vertical', minHeight: '80px' }}
              placeholder="Describe la tarea a realizar..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div style={styles.row}>
            <div style={{ ...styles.fieldGroup, flex: 1 }}>
              <label style={styles.label}>Fecha Límite</label>
              <input style={styles.input} type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
            </div>
            <div style={{ ...styles.fieldGroup, flex: 1 }}>
              <label style={styles.label}>Costo Estimado ($)</label>
              <input style={styles.input} type="number" step="0.01" placeholder="0.00" value={costoEstimado} onChange={(e) => setCostoEstimado(e.target.value)} required />
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Prioridad</label>
            <div style={styles.prioGroup}>
              {PRIORIDADES.map((p) => {
                const c = PRIORIDAD_COLORS[p];
                const selected = prioridad === p;
                return (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPrioridad(p)}
                    style={{
                      flex: 1, padding: '0.6rem', borderRadius: '8px', cursor: 'pointer',
                      fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.15s',
                      backgroundColor: selected ? c.bg : 'transparent',
                      border: `1px solid ${selected ? c.border : '#334155'}`,
                      color: selected ? c.color : '#64748b',
                    }}
                  >
                    {p === 'ALTA' ? '🔴' : p === 'MEDIA' ? '🟡' : '🟢'} {p}
                  </button>
                );
              })}
            </div>
            <div style={{ ...styles.prioInfo, backgroundColor: pc.bg, borderColor: pc.border, color: pc.color }}>
              Prioridad seleccionada: <strong>{prioridad}</strong>
            </div>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>ID del Proyecto</label>
            <input style={styles.input} type="number" placeholder="Ingresa el ID del proyecto" value={proyectoId} onChange={(e) => setProyectoId(e.target.value)} required />
          </div>
          {mensaje && (
            <div style={styles.successBox}><span>✅</span> {mensaje}</div>
          )}
          {errorMsg && (
            <div style={styles.errorBox}><span>⚠️</span> {errorMsg}</div>
          )}
          <button style={loading ? { ...styles.button, opacity: 0.7 } : styles.button} type="submit" disabled={loading}>
            {loading ? 'Guardando...' : '+ Crear Tarea'}
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
    padding: '2rem', maxWidth: '600px', boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  cardTitle: { color: '#e2e8f0', fontWeight: '600', marginBottom: '1.5rem', fontSize: '1.05rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  row: { display: 'flex', gap: '1rem' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.8rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' },
  input: {
    padding: '0.75rem 1rem', backgroundColor: '#0f172a', border: '1px solid #334155',
    borderRadius: '10px', color: '#e2e8f0', fontSize: '0.9rem', outline: 'none', width: '100%',
  },
  prioGroup: { display: 'flex', gap: '0.5rem' },
  prioInfo: {
    marginTop: '0.5rem', padding: '0.5rem 0.875rem', borderRadius: '8px',
    border: '1px solid', fontSize: '0.85rem',
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
};
