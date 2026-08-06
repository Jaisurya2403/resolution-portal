package com.mycomplaint.aigrievance.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "COMPLAINT_TIMELINE")
@Getter
@Setter
@NoArgsConstructor
public class ComplaintTimeline {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "timeline_seq")
    @SequenceGenerator(
            name = "timeline_seq",
            sequenceName = "TIMELINE_SEQ",
            allocationSize = 1)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMPLAINT_ID", nullable = false)
    private Complaint complaint;

    @Column(nullable = false, length = 200)
    private String event;

    @Column(length = 1000)
    private String remarks;

    @Column(nullable = false, updatable = false)
    private LocalDateTime eventTime = LocalDateTime.now();
}