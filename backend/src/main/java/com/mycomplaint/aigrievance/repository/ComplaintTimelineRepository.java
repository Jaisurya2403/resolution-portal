package com.mycomplaint.aigrievance.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mycomplaint.aigrievance.entity.Complaint;
import com.mycomplaint.aigrievance.entity.ComplaintTimeline;

public interface ComplaintTimelineRepository extends JpaRepository<ComplaintTimeline, Long> {

    List<ComplaintTimeline> findByComplaintOrderByEventTimeAsc(Complaint complaint);

}