package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.InternetPlanEntity;
import com.klef.soa.exam.repository.InternetPlanRepository;

@Service
public class InternetPlanServiceImpl implements InternetPlanService{

	@Autowired
	InternetPlanRepository repo;
	
	public InternetPlanEntity add(InternetPlanEntity entity) {
		return repo.save(entity);
	}
	
	public List<InternetPlanEntity> displayall(){
		return repo.findAll();
	}
	
	public InternetPlanEntity update(InternetPlanEntity entity) {
		if (entity.getId() == null || !repo.existsById(entity.getId())) {
			return null;
		}
		return repo.save(entity);
	}

	public String delete(Long id) {
		if (!repo.existsById(id)) {
			return "Plan with this id does not exist";
		}
		repo.deleteById(id);
		return "Plan deleted successfully";
	}

	
}
