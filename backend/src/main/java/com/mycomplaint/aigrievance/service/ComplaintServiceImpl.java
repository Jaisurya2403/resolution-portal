package com.mycomplaint.aigrievance.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mycomplaint.aigrievance.dto.ComplaintResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.CreateComplaintRequest;
import com.mycomplaint.aigrievance.dto.TimelineResponse;
import com.mycomplaint.aigrievance.entity.Attachment;
import com.mycomplaint.aigrievance.entity.AttachmentType;
import com.mycomplaint.aigrievance.entity.Complaint;
import com.mycomplaint.aigrievance.entity.ComplaintStatus;
import com.mycomplaint.aigrievance.entity.ComplaintTimeline;
import com.mycomplaint.aigrievance.entity.Department;
import com.mycomplaint.aigrievance.entity.Priority;
import com.mycomplaint.aigrievance.entity.User;
import com.mycomplaint.aigrievance.repository.AttachmentRepository;
import com.mycomplaint.aigrievance.repository.ComplaintRepository;
import com.mycomplaint.aigrievance.repository.ComplaintTimelineRepository;
import com.mycomplaint.aigrievance.repository.DepartmentRepository;
import com.mycomplaint.aigrievance.repository.UserRepository;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private AttachmentRepository attachmentRepository;

    @Autowired
    private ComplaintTimelineRepository timelineRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ComplaintResponse createComplaint(
            CreateComplaintRequest request,
            MultipartFile image,
            MultipartFile video,
            String userEmail) {

        try {

            // 1. Find User
            User user = userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2. Department Selection
            Department department;

            if (request.getDepartmentId() != null) {

                department = departmentRepository.findById(request.getDepartmentId())
                        .orElseThrow(() -> new RuntimeException("Department not found"));

            } else {

                // AI Prediction will come here later
                department = departmentRepository.findByName("Roads")
                        .orElseThrow(() -> new RuntimeException("Default Department not found"));
            }

            // 3. Create Complaint

            Complaint complaint = new Complaint();

            complaint.setDescription(request.getDescription());
            complaint.setAddress(request.getAddress());
            complaint.setDepartment(department);
            complaint.setUser(user);

            complaint.setStatus(ComplaintStatus.CREATED);
            complaint.setPriority(Priority.MEDIUM);
            complaint.setAiConfidence(0.0);
            complaint.setAiProcessed(false);
            
            complaint.setComplaintNumber(generateComplaintNumber());
            complaint.setTitle(generateTitle(request.getDescription()));

            complaint = complaintRepository.save(complaint);

            // 4. Generate Complaint Number

            String complaintNumber =
                    String.format("CMP-2026-%06d", complaint.getId());

            complaint.setComplaintNumber(complaintNumber);

            complaint = complaintRepository.save(complaint);

            // 5. Upload Image

            if (image != null && !image.isEmpty()) {

            	saveAttachment(
            	        complaint,
            	        image,
            	        AttachmentType.IMAGE,
            	        "C:/AI-Grievance/uploads/images/");
            }

            // 6. Upload Video

            if (video != null && !video.isEmpty()) {

            	saveAttachment(
            	        complaint,
            	        video,
            	        AttachmentType.VIDEO,
            	        "C:/AI-Grievance/uploads/videos/");
            }

            // 7. Timeline Entry

            ComplaintTimeline timeline = new ComplaintTimeline();

            timeline.setComplaint(complaint);
            timeline.setEvent("Complaint Submitted");
            timeline.setRemarks("Complaint submitted successfully.");

            timelineRepository.save(timeline);

            // 8. Response

            return mapToResponse(complaint);

        } catch (Exception e) {

            throw new RuntimeException(e.getMessage());

        }
    }

    @Override
    public ComplaintResponse getComplaint(String complaintNumber) {

        Complaint complaint = complaintRepository
                .findByComplaintNumber(complaintNumber)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        return mapToResponse(complaint);
    }
    
    @Override
    public List<ComplaintSummaryResponse> getMyComplaints(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return complaintRepository.findByUser(user)
                .stream()
                .map(complaint -> {

                    ComplaintSummaryResponse response =
                            new ComplaintSummaryResponse();

                    response.setComplaintNumber(
                            complaint.getComplaintNumber());

                    response.setDepartment(
                            complaint.getDepartment().getName());

                    response.setStatus(
                            complaint.getStatus().name());

                    return response;

                })
                .toList();
    }

    @Override
    public List<TimelineResponse> getTimeline(String complaintNumber) {

        Complaint complaint = complaintRepository
                .findByComplaintNumber(complaintNumber)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));

        return timelineRepository
                .findByComplaintOrderByEventTimeAsc(complaint)
                .stream()
                .map(timeline -> {

                    TimelineResponse response =
                            new TimelineResponse();

                    response.setEvent(timeline.getEvent());
                    response.setRemarks(timeline.getRemarks());
                    response.setEventTime(timeline.getEventTime());

                    return response;

                })
                .toList();
    }
    
    private void saveAttachment(
            Complaint complaint,
            MultipartFile file,
            AttachmentType type,
            String folder) throws IOException {

        File directory = new File(folder);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalName = file.getOriginalFilename();

        String extension = "";

        if (originalName != null && originalName.contains(".")) {

            extension =
                    originalName.substring(originalName.lastIndexOf("."));
        }

        String fileName =
                UUID.randomUUID() + extension;

        File destination =
                new File(directory, fileName);

        file.transferTo(destination);

        Attachment attachment = new Attachment();

        attachment.setComplaint(complaint);
        attachment.setFileName(fileName);
        attachment.setFilePath(destination.getAbsolutePath());
        attachment.setFileSize(file.getSize());
        attachment.setFileType(type);
        attachment.setAiAnalyzed(false);

        attachmentRepository.save(attachment);
    }
    
    private ComplaintResponse mapToResponse(Complaint complaint) {

        ComplaintResponse response = new ComplaintResponse();

        response.setComplaintNumber(complaint.getComplaintNumber());
        response.setDescription(complaint.getDescription());
        response.setAddress(complaint.getAddress());
        response.setDepartment(complaint.getDepartment().getName());
        response.setStatus(complaint.getStatus().name());
        response.setPriority(complaint.getPriority().name());
        response.setAiConfidence(complaint.getAiConfidence());
        response.setCreatedAt(complaint.getCreatedAt());

        return response;
    }
    private String generateComplaintNumber() {
        return "CMP-" + System.currentTimeMillis();
    }
    private String generateTitle(String description) {

        if (description == null || description.isBlank()) {
            return "General Complaint";
        }

        String title = description.trim();

        if (title.length() > 150) {
            title = title.substring(0, 150);
        }

        return title;
    }
}