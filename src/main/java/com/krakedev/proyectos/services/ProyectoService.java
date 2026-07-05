package com.krakedev.proyectos.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krakedev.proyectos.entidades.Proyecto;
import com.krakedev.proyectos.repositories.ProyectoRepository;

@Service
public class ProyectoService {

	private final ProyectoRepository repository;

	public ProyectoService(ProyectoRepository repository) {
		this.repository = repository;
	}

	public Proyecto crear(Proyecto proyecto) {
		return repository.save(proyecto);
	}

	public List<Proyecto> listar() {
		return repository.findAll();
	}

	public Proyecto buscarPorId(int id) {
		Optional<Proyecto> encontrado = repository.findById(id);

		return encontrado.orElse(null);
	}

	public Proyecto actualizar(int id, Proyecto proyecto) {
		Proyecto encontrado = buscarPorId(id);

		if (encontrado == null) {
			return null;
		}

		encontrado.setNombre(proyecto.getNombre());
		encontrado.setDescripcion(proyecto.getDescripcion());
		encontrado.setTareas(proyecto.getTareas());
		encontrado.setFechaInicio(proyecto.getFechaInicio());

		return repository.save(encontrado);
	}

	public long contarProyectos() {
		return repository.count();
	}

	public boolean eliminar(int id) {
		Proyecto encontrado = buscarPorId(id);

		if (encontrado == null) {
			return false;
		}

		repository.deleteById(id);
		return true;
	}
}
