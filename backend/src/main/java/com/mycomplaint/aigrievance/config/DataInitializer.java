package com.mycomplaint.aigrievance.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.mycomplaint.aigrievance.entity.Department;
import com.mycomplaint.aigrievance.repository.DepartmentRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner loadDepartments(DepartmentRepository repository) {

        return args -> {

            addDepartment(repository,
                    "Roads",
                    "roads@demo.gov",
                    "9876543210");

            addDepartment(repository,
                    "Water",
                    "water@demo.gov",
                    "9876543211");

            addDepartment(repository,
                    "Electricity",
                    "electricity@demo.gov",
                    "9876543212");

            addDepartment(repository,
                    "Sanitation",
                    "sanitation@demo.gov",
                    "9876543213");

            addDepartment(repository,
                    "Drainage",
                    "drainage@demo.gov",
                    "9876543214");

            addDepartment(repository,
                    "Public Transport",
                    "transport@demo.gov",
                    "9876543215");

            addDepartment(repository,
                    "Parks",
                    "parks@demo.gov",
                    "9876543216");
        };
    }

    private void addDepartment(
            DepartmentRepository repository,
            String name,
            String email,
            String phone) {

        if (repository.countByName(name) == 0) {

            Department department = new Department();

            department.setName(name);
            department.setEmail(email);
            department.setPhone(phone);
            department.setActive(true);

            repository.save(department);
        }
    }
}