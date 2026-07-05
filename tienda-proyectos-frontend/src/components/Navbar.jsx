export default function Navbar({ rol, vista, setVista, onLogout }) {
  const rolColor = rol === 'ADMIN' ? '#22c55e' : '#6366f1';
  const rolBg = rol === 'ADMIN' ? 'rgba(34,197,94,0.1)' : 'rgba(99,102,241,0.1)';

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <div style={styles.brand}>
          <span style={styles.brandIcon}>⚡</span>
          <span style={styles.brandText}>ProyectosApp</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.links}>
          <NavBtn active={vista === 'proyectos'} onClick={() => setVista('proyectos')} icon="📋">
            Ver Proyectos
          </NavBtn>
          {rol === 'ADMIN' && (
            <>
              <NavBtn active={vista === 'crear'} onClick={() => setVista('crear')} icon="📁">
                Gestionar Proyectos
              </NavBtn>
              <NavBtn active={vista === 'tarea'} onClick={() => setVista('tarea')} icon="✅">
                Crear Tareas
              </NavBtn>
            </>
          )}
        </div>
      </div>
      <div style={styles.right}>
        <div style={{ ...styles.rolBadge, color: rolColor, backgroundColor: rolBg, borderColor: rolColor + '33' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: rolColor, display: 'inline-block' }} />
          {rol}
        </div>
        <button style={styles.logout} onClick={onLogout}>
          <span>🚪</span> Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}

function NavBtn({ active, onClick, icon, children }) {
  return (
    <button
      onClick={onClick}
      style={active ? { ...btnStyle, ...activeStyle } : btnStyle}
    >
      <span>{icon}</span> {children}
    </button>
  );
}

const btnStyle = {
  display: 'flex', alignItems: 'center', gap: '0.4rem',
  background: 'none', border: '1px solid transparent', color: '#94a3b8',
  padding: '0.5rem 0.875rem', borderRadius: '8px', cursor: 'pointer',
  fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.15s',
};
const activeStyle = {
  backgroundColor: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)',
  color: '#818cf8',
};

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1e293b', padding: '0.875rem 2rem',
    borderBottom: '1px solid #334155',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  left: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  brand: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  brandIcon: { fontSize: '1.4rem' },
  brandText: { fontWeight: '700', fontSize: '1.1rem', color: '#6366f1' },
  divider: { width: '1px', height: '24px', backgroundColor: '#334155' },
  links: { display: 'flex', gap: '0.25rem' },
  right: { display: 'flex', alignItems: 'center', gap: '1rem' },
  rolBadge: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem',
    fontWeight: '600', border: '1px solid', textTransform: 'uppercase', letterSpacing: '0.05em',
  },
  logout: {
    display: 'flex', alignItems: 'center', gap: '0.4rem',
    backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
    color: '#fca5a5', padding: '0.5rem 1rem', borderRadius: '8px',
    cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500',
  },
};
