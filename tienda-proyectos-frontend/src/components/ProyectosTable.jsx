import { useEffect, useState } from 'react';

export default function ProyectosTable() {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProyectos = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8080/api/proyectos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { setError('Error al cargar proyectos.'); setLoading(false); return; }
        const data = await res.json();
        setProyectos(data);
      } catch {
        setError('Error de conexión con el servidor.');
      } finally {
        setLoading(false);
      }
    };
    fetchProyectos();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>📋 Proyectos</h2>
          <p style={styles.subtitle}>Listado completo de proyectos registrados en el sistema</p>
        </div>
        <div style={styles.countBadge}>{proyectos.length} proyectos</div>
      </div>

      {loading && (
        <div style={styles.stateBox}>
          <div style={styles.spinner} />
          <p style={styles.stateText}>Cargando proyectos...</p>
        </div>
      )}

      {error && (
        <div style={styles.errorBox}>
          <span>⚠️</span> {error}
        </div>
      )}

      {!loading && !error && (
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>Descripción</th>
                <th style={styles.th}>Fecha Inicio</th>
                <th style={styles.th}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.length === 0 ? (
                <tr>
                  <td colSpan={5} style={styles.empty}>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
                      <p>No hay proyectos registrados aún</p>
                    </div>
                  </td>
                </tr>
              ) : (
                proyectos.map((p, i) => (
                  <tr key={p.id} style={i % 2 === 0 ? styles.trEven : styles.trOdd}>
                    <td style={styles.tdId}>{p.id}</td>
                    <td style={styles.tdBold}>{p.nombre}</td>
                    <td style={styles.td}>{p.descripcion || '—'}</td>
                    <td style={styles.td}>{p.fechaInicio || '—'}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>Activo</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: '2rem 2.5rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' },
  title: { fontSize: '1.5rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.25rem' },
  subtitle: { color: '#64748b', fontSize: '0.9rem' },
  countBadge: {
    backgroundColor: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
    color: '#818cf8', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600',
  },
  stateBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', gap: '1rem' },
  spinner: {
    width: '36px', height: '36px', border: '3px solid #334155',
    borderTop: '3px solid #6366f1', borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  stateText: { color: '#64748b' },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5', padding: '1rem 1.25rem', borderRadius: '10px',
  },
  tableCard: {
    backgroundColor: '#1e293b', borderRadius: '14px', border: '1px solid #334155',
    overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.75rem',
    fontWeight: '600', color: '#64748b', textTransform: 'uppercase',
    letterSpacing: '0.06em', backgroundColor: '#0f172a', borderBottom: '1px solid #334155',
  },
  trEven: { backgroundColor: '#1e293b', borderBottom: '1px solid #1e293b' },
  trOdd: { backgroundColor: '#172033', borderBottom: '1px solid #1e293b' },
  td: { padding: '1rem 1.25rem', color: '#94a3b8', fontSize: '0.9rem' },
  tdId: { padding: '1rem 1.25rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '500' },
  tdBold: { padding: '1rem 1.25rem', color: '#e2e8f0', fontWeight: '600', fontSize: '0.9rem' },
  empty: { color: '#64748b', fontSize: '0.9rem' },
  badge: {
    backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
    color: '#86efac', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '500',
  },
};
