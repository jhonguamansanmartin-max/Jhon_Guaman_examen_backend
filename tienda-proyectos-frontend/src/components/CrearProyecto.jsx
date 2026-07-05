import { useState } from 'react';

export default function CrearProyecto({ rol }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setErrorMsg('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion, fechaInicio }),
      });
      if (res.status === 403) {
        setErrorMsg('Acceso denegado: no tienes permisos para crear proyectos (403 Forbidden)');
        return;
      }
      if (!res.ok) {
        setErrorMsg('Error al crear el proyecto');
        return;
      }
      setMensaje('Proyecto creado exitosamente');
      setNombre('');
      setDescripcion('');
      setFechaInicio('');
    } catch {
      setErrorMsg('Error de conexión');
    }
  };

  if (rol !== 'ADMIN') {
    return (
      <div style={styles.container}>
        <div style={styles.denied}>Acceso restringido: solo ADMIN puede crear proyectos.</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Proyecto</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input style={styles.input} placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        <input style={styles.input} type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
        {mensaje && <p style={styles.success}>{mensaje}</p>}
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <button style={styles.button} type="submit">Guardar Proyecto</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '2rem', maxWidth: '500px' },
  title: { color: '#e94560', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: {
    padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #0f3460',
    backgroundColor: '#0f3460', color: '#fff', fontSize: '1rem',
  },
  button: {
    padding: '0.75rem', borderRadius: '8px', border: 'none',
    backgroundColor: '#e94560', color: '#fff', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold',
  },
  success: { color: '#6bcb77' },
  error: { color: '#ff6b6b', fontWeight: 'bold' },
  denied: {
    padding: '1rem', backgroundColor: '#3a0000', border: '1px solid #e94560',
    color: '#ff6b6b', borderRadius: '8px',
  },
};
