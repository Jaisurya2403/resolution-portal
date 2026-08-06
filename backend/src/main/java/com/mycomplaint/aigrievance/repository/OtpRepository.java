package com.mycomplaint.aigrievance.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.mycomplaint.aigrievance.entity.OtpVerification;

@Repository
public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findByEmail(String email);

    @Transactional
    @Modifying
    void deleteByEmail(String email);

    Optional<OtpVerification> findByEmailAndOtp(String email, String otp);

}