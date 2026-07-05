package com.krakedev.proyectos.controllers;

import java.util.List;

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

import com.krakedev.proyectos.entidades.Empleado;
import com.krakedev.proyectos.services.EmpleadoService;

@CrossOrigin(origins = "http://localhost:5173", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE }, allowedHeaders = { "Authorization", "Content-Type" })
@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {

	private final EmpleadoService service;
	
	public EmpleadoController(EmpleadoService service) {
		this.service = service;
	}
	
	@PostMapping
	public ResponseEntity<?> guardar(@RequestBody Empleado empleado) {
		try {

			return new ResponseEntity<>(service.crear(empleado), HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PreAuthorize("hasAnyRole('ADMIN', 'USER')")
	@GetMapping
	public ResponseEntity<?> listar() {

		try {

			List<Empleado> lista = service.listar();
			return ResponseEntity.ok(lista);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@GetMapping("/{id}")
	public ResponseEntity<?> buscar(@PathVariable int id) {

		try {

			Empleado empleado = service.buscarPorId(id);

			if (empleado == null) {
				return new ResponseEntity<>("Empleado no encontrado", HttpStatus.NOT_FOUND);
			}

			return ResponseEntity.ok(empleado);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping("/{id}")
	public ResponseEntity<?> actualizar(@PathVariable int id, @RequestBody Empleado empleado) {

		try {

			Empleado actualizado = service.actualizar(id, empleado);

			if (actualizado == null) {
				return new ResponseEntity<>("Empleado no encontrado", HttpStatus.NOT_FOUND);
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
				return ResponseEntity.ok("Empleado eliminado");
			}

			return new ResponseEntity<>("Empleado no encontrado", HttpStatus.NOT_FOUND);

		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}
