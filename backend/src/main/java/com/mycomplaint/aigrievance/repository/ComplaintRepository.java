package com.mycomplaint.aigrievance.repository;

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

}