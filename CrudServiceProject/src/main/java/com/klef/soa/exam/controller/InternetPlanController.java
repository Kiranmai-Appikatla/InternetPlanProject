package com.klef.soa.exam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.exam.entity.InternetPlanEntity;
import com.klef.soa.exam.service.InternetPlanService;
import com.klef.soa.exam.service.InternetPlanServiceImpl;

import io.swagger.v3.oas.annotations.tags.Tag;

@CrossOrigin
@RestController
@RequestMapping("/InternetPlan")
@Tag(name = "Internet Plan", description = "Add, list, update, and delete internet plans")
public class InternetPlanController {
	
	@Autowired
	InternetPlanService service;

	@GetMapping("/")
	public String home() {
		return "CRUD Service is running";
	}
	
	@PostMapping("/Add")
	public InternetPlanEntity add(@RequestBody InternetPlanEntity object) {
		return service.add(object);
	}
	
	@GetMapping("/DisplayAll")
	public List<InternetPlanEntity> displayall(){
		return service.displayall();
	}

	@PutMapping("/Update")
	public InternetPlanEntity update(@RequestBody InternetPlanEntity object) {
		return service.update(object);
	}
	
	@DeleteMapping("/Delete/{id}")
	public String delete(@PathVariable Long id) {
		return service.delete(id);
	}
}
