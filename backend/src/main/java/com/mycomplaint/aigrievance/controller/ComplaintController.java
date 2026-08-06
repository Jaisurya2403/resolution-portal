package com.mycomplaint.aigrievance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.mycomplaint.aigrievance.dto.ComplaintResponse;
import com.mycomplaint.aigrievance.dto.ComplaintSummaryResponse;
import com.mycomplaint.aigrievance.dto.CreateComplaintRequest;
import com.mycomplaint.aigrievance.dto.TimelineResponse;
import com.mycomplaint.aigrievance.service.ComplaintService;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ComplaintResponse> createComplaint(

            @RequestParam("description") String description,

            @RequestParam("address") String address,

            @RequestParam(value = "departmentId", required = false) Long departmentId,

            @RequestPart("image") MultipartFile image,

            @RequestPart(value = "video", required = false) MultipartFile video,

            @RequestParam("userEmail") String userEmail) {

        CreateComplaintRequest request = new CreateComplaintRequest();

        request.setDescription(description);
        request.setAddress(address);
        request.setDepartmentId(departmentId);

        return ResponseEntity.ok(
                complaintService.createComplaint(
                        request,
                        image,
                        video,
                        userEmail));
    }

    @GetMapping("/{complaintNumber}")
    public ResponseEntity<ComplaintResponse> getComplaint(
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.getComplaint(complaintNumber));
    }

    @GetMapping("/my")
    public ResponseEntity<List<ComplaintSummaryResponse>> myComplaints(

            @RequestParam String userEmail) {

        return ResponseEntity.ok(
                complaintService.getMyComplaints(userEmail));
    }

    @GetMapping("/{complaintNumber}/timeline")
    public ResponseEntity<List<TimelineResponse>> timeline(

            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.getTimeline(complaintNumber));
    }

}