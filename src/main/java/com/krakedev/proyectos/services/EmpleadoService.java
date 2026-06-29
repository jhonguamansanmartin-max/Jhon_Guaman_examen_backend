package com.krakedev.proyectos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Empleado;
import com.krakedev.proyectos.repositories.EmpleadoRepository;

@Service
public class EmpleadoService {

	private final EmpleadoRepository repository;

	public EmpleadoService(EmpleadoRepository repository) {
		this.repository = repository;
	}

	public Empleado crear(Empleado empleado) {
		return repository.save(empleado);
	}

	public List<Empleado> listar() {
		return repository.findAll();
	}

	public Empleado buscarPorId(int id) {
		Optional<Empleado> encontrado = repository.findById(id);

		return encontrado.orElse(null);
	}

	public Empleado actualizar(int id, Empleado empleado) {
		Empleado encontrado = buscarPorId(id);

		if (encontrado == null) {
			return null;
		}

		encontrado.setNombre(empleado.getNombre());
		encontrado.setCargo(empleado.getCargo());
		encontrado.setTareas(empleado.getTareas());

		return repository.save(encontrado);
	}

	public boolean eliminar(int id) {
		Empleado encontrado = buscarPorId(id);

		if (encontrado == null) {
			return false;
		}

		repository.deleteById(id);
		return true;
	}
}
