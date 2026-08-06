package com.mycomplaint.aigrievance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendOtp(String toEmail, String otp) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(toEmail);
        message.setSubject("AI Grievance Redressal System - Email Verification");

        message.setText(
                "Dear User,\n\n"
              + "Your One-Time Password (OTP) is: " + otp
              + "\n\nThis OTP is valid for 5 minutes."
              + "\n\nPlease do not share this OTP with anyone."
              + "\n\nRegards,\n"
              + "AI Grievance Redressal System");

        mailSender.send(message);
    }
}