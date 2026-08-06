package com.mycomplaint.aigrievance.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "OTP_VERIFICATION")
@Getter
@Setter
@NoArgsConstructor
public class OtpVerification {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "otp_seq")
	@SequenceGenerator(
	    name = "otp_seq",
	    sequenceName = "OTP_SEQ",
	    allocationSize = 1
	)
	private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private LocalDateTime expiryTime;

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}