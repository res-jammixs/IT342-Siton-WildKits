package com.wildkits.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.wildkits.dto.LoginRequestDTO;
import com.wildkits.dto.UserRegistrationRequestDTO;
import com.wildkits.dto.UserResponseDTO;
import com.wildkits.enums.AccountStatus;

public interface UserService {
    
    UserResponseDTO registerUser(UserRegistrationRequestDTO requestDTO);
    
    UserResponseDTO registerWithImage(String email, String password, String fullName, 
            String studentId, String department, String yearLevel, MultipartFile studentIdImage) throws Exception;
    
    UserResponseDTO login(LoginRequestDTO requestDTO);
    
    UserResponseDTO getUserById(UUID userId);
    
    List<UserResponseDTO> getAllUsers();
    
    UserResponseDTO updateUser(UUID userId, UserRegistrationRequestDTO requestDTO);
    
    UserResponseDTO updateUserStatus(UUID userId, AccountStatus status);
    
    void deleteUser(UUID userId);
}
