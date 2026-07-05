import { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProyectosTable from './components/ProyectosTable';
import CrearProyecto from './components/CrearProyecto';
import CrearTarea from './components/CrearTarea';

export default function App() {
  const [rol, setRol] = useState(localStorage.getItem('rol'));
  const [vista, setVista] = useState('proyectos');

  const handleLogin = (rolUsuario) => {
    setRol(rolUsuario);
    setVista('proyectos');
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // ignorar error de red al logout
    }
    localStorage.clear();
    setRol(null);
    setVista('proyectos');
  };

  if (!rol) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a2e', color: '#fff' }}>
      <Navbar rol={rol} vista={vista} setVista={setVista} onLogout={handleLogout} />
      <main>
        {vista === 'proyectos' && <ProyectosTable />}
        {vista === 'crear' && <CrearProyecto rol={rol} />}
        {vista === 'tarea' && rol === 'ADMIN' && <CrearTarea />}
      </main>
    </div>
  );
}
