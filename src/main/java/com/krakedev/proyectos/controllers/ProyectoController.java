package com.krakedev.proyectos.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krakedev.proyectos.entidades.Proyecto;
import com.krakedev.proyectos.services.ProyectoService;

@RestController
@RequestMapping("/api/proyectos")
public class ProyectoController {
	private final ProyectoService service;

	public ProyectoController(ProyectoService service) {
		this.service = service;
	}

	@PostMapping
	public ResponseEntity<?> guardar(@RequestBody Proyecto proyecto) {
		try {

			return new ResponseEntity<>(service.crear(proyecto), HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping
	public ResponseEntity<?> listar() {

		try {

			List<Proyecto> lista = service.listar();
			return ResponseEntity.ok(lista);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscar(@PathVariable int id) {

		try {

			Proyecto proyecto = service.buscarPorId(id);

			if (proyecto == null) {
				return new ResponseEntity<>("Proyecto no encontrado", HttpStatus.NOT_FOUND);
			}

			return ResponseEntity.ok(proyecto);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> actualizar(@PathVariable int id, @RequestBody Proyecto proyecto) {

		try {

			Proyecto actualizado = service.actualizar(id, proyecto);

			if (actualizado == null) {
				return new ResponseEntity<>("Proyecto no encontrado", HttpStatus.NOT_FOUND);
			}

			return ResponseEntity.ok(actualizado);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> eliminar(@PathVariable int id) {

		try {

			if (service.eliminar(id)) {
				return ResponseEntity.ok("Proyecto eliminado");
			}

			return new ResponseEntity<>("Proyecto no encontrado", HttpStatus.NOT_FOUND);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
