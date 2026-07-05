export default function Navbar({ rol, vista, setVista, onLogout }) {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>Gestión de Proyectos</div>
      <div style={styles.links}>
        <button
          style={vista === 'proyectos' ? { ...styles.link, ...styles.active } : styles.link}
          onClick={() => setVista('proyectos')}
        >
          Ver Proyectos
        </button>
        {rol === 'ADMIN' && (
          <>
            <button
              style={vista === 'crear' ? { ...styles.link, ...styles.active } : styles.link}
              onClick={() => setVista('crear')}
            >
              Gestionar Proyectos
            </button>
            <button
              style={vista === 'tarea' ? { ...styles.link, ...styles.active } : styles.link}
              onClick={() => setVista('tarea')}
            >
              Crear Tareas
            </button>
          </>
        )}
        <button style={styles.logout} onClick={onLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#16213e', padding: '1rem 2rem',
    borderBottom: '2px solid #e94560',
  },
  brand: { color: '#e94560', fontWeight: 'bold', fontSize: '1.2rem' },
  links: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  link: {
    background: 'none', border: '1px solid #0f3460', color: '#ccc',
    padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem',
  },
  active: { backgroundColor: '#0f3460', color: '#fff', borderColor: '#e94560' },
  logout: {
    background: '#e94560', border: 'none', color: '#fff',
    padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem',
    fontWeight: 'bold',
  },
};
