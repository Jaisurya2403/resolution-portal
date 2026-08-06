package com.mycomplaint.aigrievance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycomplaint.aigrievance.entity.Attachment;
import com.mycomplaint.aigrievance.entity.Complaint;

public interface AttachmentRepository extends JpaRepository<Attachment, Long> {

    List<Attachment> findByComplaint(Complaint complaint);

}