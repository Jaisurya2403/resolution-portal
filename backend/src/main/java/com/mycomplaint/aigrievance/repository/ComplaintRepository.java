package com.mycomplaint.aigrievance.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycomplaint.aigrievance.entity.Complaint;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;
import com.mycomplaint.aigrievance.entity.User;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    Optional<Complaint> findByComplaintNumber(String complaintNumber);

    List<Complaint> findByUser(User user);

    List<Complaint> findByStatus(ComplaintStatus status);
    
    long countByStatus(ComplaintStatus status);

    long countByAiProcessed(Boolean aiProcessed);

    long countByCreatedAtBetween(
            LocalDateTime start,
            LocalDateTime end);

    List<Complaint> findByDepartmentId(Long departmentId);

    List<Complaint> findByDepartmentIdOrderByCreatedAtDesc(Long departmentId);

    List<Complaint> findAllByOrderByCreatedAtDesc();

    List<Complaint> findByStatusOrderByCreatedAtDesc(ComplaintStatus status);

    List<Complaint> findByComplaintNumberContainingIgnoreCase(String complaintNumber);

    List<Complaint> findByTitleContainingIgnoreCase(String title);

    List<Complaint> findByUser_NameContainingIgnoreCase(String name);
}