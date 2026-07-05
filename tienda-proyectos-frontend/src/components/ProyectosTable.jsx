import { useEffect, useState } from 'react';

export default function ProyectosTable() {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProyectos = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:8080/api/proyectos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setError('Error al cargar proyectos');
          return;
        }
        const data = await res.json();
        setProyectos(data);
      } catch {
        setError('Error de conexión');
      }
    };
    fetchProyectos();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Proyectos Registrados</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Descripción</th>
              <th style={styles.th}>Fecha Inicio</th>
            </tr>
          </thead>
          <tbody>
            {proyectos.length === 0 ? (
              <tr><td colSpan={4} style={styles.empty}>Sin proyectos registrados</td></tr>
            ) : (
              proyectos.map((p) => (
                <tr key={p.id} style={styles.tr}>
                  <td style={styles.td}>{p.id}</td>
                  <td style={styles.td}>{p.nombre}</td>
                  <td style={styles.td}>{p.descripcion}</td>
                  <td style={styles.td}>{p.fechaInicio}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '2rem' },
  title: { color: '#e94560', marginBottom: '1rem' },
  error: { color: '#ff6b6b' },
  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#16213e', borderRadius: '8px', overflow: 'hidden' },
  thead: { backgroundColor: '#0f3460' },
  th: { padding: '0.75rem 1rem', color: '#e94560', textAlign: 'left', borderBottom: '2px solid #e94560' },
  tr: { borderBottom: '1px solid #0f3460' },
  td: { padding: '0.75rem 1rem', color: '#ccc' },
  empty: { padding: '1rem', color: '#888', textAlign: 'center' },
};
