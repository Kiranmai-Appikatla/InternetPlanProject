package com.klef.soa.exam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.soa.exam.entity.InternetPlanEntity;


public interface InternetPlanService {

	InternetPlanEntity add(InternetPlanEntity object);

	List<InternetPlanEntity> displayall();

	String delete(Long id);

}
