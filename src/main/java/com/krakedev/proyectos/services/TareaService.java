package com.krakedev.proyectos.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Empleado;
import com.krakedev.proyectos.entidades.Proyecto;
import com.krakedev.proyectos.entidades.Tarea;
import com.krakedev.proyectos.repositories.EmpleadoRepository;
import com.krakedev.proyectos.repositories.ProyectoRepository;
import com.krakedev.proyectos.repositories.TareaRepository;

@Service
public class TareaService {

	private final TareaRepository repository;
	private final ProyectoRepository proyectoRepository;
	private final EmpleadoRepository empleadoRepository;

	public TareaService(TareaRepository repository, ProyectoRepository proyectoRepository,
			EmpleadoRepository empleadoRepository) {
		this.repository = repository;
		this.proyectoRepository = proyectoRepository;
		this.empleadoRepository = empleadoRepository;
	}

	public Tarea guardar(Tarea tarea) {
		String prioridad = tarea.getPrioridad();
		if (prioridad == null || (!prioridad.equals("ALTA") && !prioridad.equals("MEDIA") && !prioridad.equals("BAJA"))) {
			throw new RuntimeException("Prioridad no válida");
		}

		Proyecto proyecto = proyectoRepository.findById(tarea.getProyecto().getId())
				.orElseThrow(() -> new RuntimeException("El Proyecto no existe"));

		List<Empleado> empleadosDB = new ArrayList<>();

		for (Empleado empleado : tarea.getEmpleados()) {
			Empleado empleadoEncontrado = empleadoRepository.findById(empleado.getId())
					.orElseThrow(() -> new RuntimeException("El empleado no existe"));

			empleadosDB.add(empleadoEncontrado);
		}

		tarea.setProyecto(proyecto);
		tarea.setEmpleados(empleadosDB);

		return repository.save(tarea);
	}

	public List<Tarea> listar() {
		return repository.findAll();
	}

	public Tarea buscarPorId(int id) {
		Optional<Tarea> encontrada = repository.findById(id);

		return encontrada.orElse(null);
	}

	public Tarea actualizar(int id, Tarea tarea) {

		Tarea encontrada = buscarPorId(id);

		if (encontrada == null) {
			return null;
		}

		encontrada.setFechaLimite(tarea.getFechaLimite());
		encontrada.setDescripcion(tarea.getDescripcion());
		encontrada.setCostoEstimado(tarea.getCostoEstimado());

		return repository.save(encontrada);
	}

	public boolean eliminar(int id) {

		Tarea encontrada = buscarPorId(id);

		if (encontrada == null) {
			return false;
		}

		repository.deleteById(id);
		return true;
	}

}
