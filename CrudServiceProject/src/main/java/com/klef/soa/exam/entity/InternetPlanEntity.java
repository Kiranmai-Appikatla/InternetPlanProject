package com.klef.soa.exam.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class InternetPlanEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String planName;
	private Integer speedMbps;
	private Double monthlyFee;
	private Boolean active;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public Integer getSpeedMbps() {
		return speedMbps;
	}
	public void setSpeedMbps(Integer speedMbps) {
		this.speedMbps = speedMbps;
	}
	public Double getMonthlyFee() {
		return monthlyFee;
	}
	public void setMonthlyFee(Double monthlyFee) {
		this.monthlyFee = monthlyFee;
	}
	public Boolean getActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	@Override
	public String toString() {
		return "InternetPlanEntity [id=" + id + ", planName=" + planName + ", speedMbps=" + speedMbps + ", monthlyFee="
				+ monthlyFee + ", active=" + active + "]";
	}
	
}
