import { useState } from 'react';

export default function CrearTarea() {
  const [descripcion, setDescripcion] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [costoEstimado, setCostoEstimado] = useState('');
  const [prioridad, setPrioridad] = useState('ALTA');
  const [proyectoId, setProyectoId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setErrorMsg('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:8080/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          descripcion,
          fechaLimite,
          costoEstimado: parseFloat(costoEstimado),
          prioridad,
          proyecto: { id: parseInt(proyectoId) },
          empleados: [],
        }),
      });
      if (res.status === 403) {
        setErrorMsg('Acceso denegado: no tienes permisos (403 Forbidden)');
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Error al crear tarea');
        return;
      }
      setMensaje('Tarea creada exitosamente');
      setDescripcion(''); setFechaLimite(''); setCostoEstimado(''); setProyectoId('');
    } catch {
      setErrorMsg('Error de conexión');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Tarea</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input style={styles.input} placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <input style={styles.input} type="date" value={fechaLimite} onChange={(e) => setFechaLimite(e.target.value)} required />
        <input style={styles.input} type="number" placeholder="Costo estimado" value={costoEstimado} onChange={(e) => setCostoEstimado(e.target.value)} required />
        <select style={styles.input} value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
          <option value="ALTA">ALTA</option>
          <option value="MEDIA">MEDIA</option>
          <option value="BAJA">BAJA</option>
        </select>
        <input style={styles.input} type="number" placeholder="ID del Proyecto" value={proyectoId} onChange={(e) => setProyectoId(e.target.value)} required />
        {mensaje && <p style={styles.success}>{mensaje}</p>}
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <button style={styles.button} type="submit">Guardar Tarea</button>
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
};
