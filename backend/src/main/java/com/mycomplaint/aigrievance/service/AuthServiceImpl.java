package com.mycomplaint.aigrievance.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mycomplaint.aigrievance.dto.AuthResponse;
import com.mycomplaint.aigrievance.dto.LoginRequest;
import com.mycomplaint.aigrievance.dto.RegisterRequest;
import com.mycomplaint.aigrievance.dto.SendOtpRequest;
import com.mycomplaint.aigrievance.dto.VerifyOtpRequest;
import com.mycomplaint.aigrievance.entity.OtpVerification;
import com.mycomplaint.aigrievance.entity.Role;
import com.mycomplaint.aigrievance.entity.User;
import com.mycomplaint.aigrievance.repository.OtpRepository;
import com.mycomplaint.aigrievance.repository.UserRepository;
import com.mycomplaint.aigrievance.security.JwtService;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;

    @Override
    public AuthResponse sendOtp(SendOtpRequest request) {

    	if (userRepository.countByEmail(request.getEmail()) > 0) {
            return new AuthResponse("Email is already registered.", null);
        }

        otpRepository.deleteByEmail(request.getEmail());

        SecureRandom random = new SecureRandom();
        String otp = String.valueOf(100000 + random.nextInt(900000));

        OtpVerification otpVerification = new OtpVerification();
        otpVerification.setEmail(request.getEmail());
        otpVerification.setOtp(otp);
        otpVerification.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        otpVerification.setVerified(false);

        otpRepository.save(otpVerification);

        emailService.sendOtp(request.getEmail(), otp);

        return new AuthResponse("OTP sent successfully to your email.", null);
    }

    @Override
    public AuthResponse verifyOtp(VerifyOtpRequest request) {

        Optional<OtpVerification> otpRecord =
                otpRepository.findByEmailAndOtp(request.getEmail(), request.getOtp());

        if (otpRecord.isEmpty()) {
            return new AuthResponse("Invalid OTP.", null);
        }

        OtpVerification otp = otpRecord.get();

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new AuthResponse("OTP has expired.", null);
        }

        if (Boolean.TRUE.equals(otp.getVerified())) {
            return new AuthResponse("OTP is already verified.", null);
        }

        otp.setVerified(true);
        otpRepository.save(otp);

        return new AuthResponse("OTP verified successfully.", null);
    }

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return new AuthResponse("Passwords do not match.", null);
        }

        if (userRepository.countByEmail(request.getEmail()) > 0) {
            return new AuthResponse("Email is already registered.", null);
        }

        if (userRepository.countByPhone(request.getPhone()) > 0) {
            return new AuthResponse("Phone number is already registered.", null);
        }

        Optional<OtpVerification> otpRecord =
                otpRepository.findByEmail(request.getEmail());

        if (otpRecord.isEmpty()) {
            return new AuthResponse("Please verify your OTP first.", null);
        }

        OtpVerification otp = otpRecord.get();

        if (!Boolean.TRUE.equals(otp.getVerified())) {
            return new AuthResponse("OTP is not verified.", null);
        }

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            return new AuthResponse("OTP has expired. Please request a new OTP.", null);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setEnabled(true);

        userRepository.save(user);

        otpRepository.deleteByEmail(request.getEmail());

        return new AuthResponse("Registration successful.", null);
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

        if (userOptional.isEmpty()) {
            return new AuthResponse("Invalid email or password.", null);
        }

        User user = userOptional.get();

        if (!Boolean.TRUE.equals(user.getEnabled())) {
            return new AuthResponse("Account is disabled.", null);
        }
        System.out.println("Entered Password : " + request.getPassword());
        System.out.println("Database Password : " + user.getPassword());

        boolean match = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        System.out.println("Password Match : " + match);
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse("Invalid email or password.", null);
        }

        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse("Login successful.", token);
    }
}