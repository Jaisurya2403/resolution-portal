package com.mycomplaint.aigrievance.service;

import com.mycomplaint.aigrievance.dto.AuthResponse;
import com.mycomplaint.aigrievance.dto.LoginRequest;
import com.mycomplaint.aigrievance.dto.RegisterRequest;
import com.mycomplaint.aigrievance.dto.SendOtpRequest;
import com.mycomplaint.aigrievance.dto.VerifyOtpRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse sendOtp(SendOtpRequest request);

    AuthResponse verifyOtp(VerifyOtpRequest request);

}