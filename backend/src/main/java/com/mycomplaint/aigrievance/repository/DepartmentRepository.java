package com.mycomplaint.aigrievance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycomplaint.aigrievance.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByName(String name);

    long countByName(String name);
}