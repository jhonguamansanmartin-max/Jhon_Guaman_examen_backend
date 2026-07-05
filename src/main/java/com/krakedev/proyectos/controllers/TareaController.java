package com.krakedev.proyectos.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.krakedev.proyectos.entidades.Tarea;
import com.krakedev.proyectos.services.TareaService;

@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE }, allowedHeaders = { "Authorization", "Content-Type" })
@RestController
@RequestMapping("/api/tareas")
public class TareaController {
	private final TareaService service;

	public TareaController(TareaService service) {
		this.service = service;
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<?> guardar(@RequestBody Tarea tarea) {

		try {

			Tarea nueva = service.guardar(tarea);

			return new ResponseEntity<>(nueva, HttpStatus.CREATED);

		} catch (RuntimeException e) {

			return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.BAD_REQUEST);

		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping
	public ResponseEntity<?> listar() {

		try {

			List<Tarea> lista = service.listar();

			return ResponseEntity.ok(lista);

		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscar(@PathVariable int id) {

		try {

			Tarea tarea = service.buscarPorId(id);

			if (tarea == null) {
				return new ResponseEntity<>("Reparación no encontrada", HttpStatus.NOT_FOUND);
			}

			return ResponseEntity.ok(tarea);

		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> actualizar(@PathVariable int id, @RequestBody Tarea tarea) {

		try {

			Tarea actualizada = service.actualizar(id, tarea);

			if (actualizada == null) {
				return new ResponseEntity<>("Tarea no encontrada", HttpStatus.NOT_FOUND);
			}

			return ResponseEntity.ok(actualizada);

		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> eliminar(@PathVariable int id) {

		try {

			if (service.eliminar(id)) {
				return ResponseEntity.ok("Tarea eliminada");
			}

			return new ResponseEntity<>("Tarea no encontrada", HttpStatus.NOT_FOUND);

		} catch (Exception e) {

			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);

		}

	}
}
