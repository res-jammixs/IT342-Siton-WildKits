package com.wildkits.service;

import java.util.List;

import com.wildkits.dto.UserRegistrationRequestDTO;
import com.wildkits.dto.UserResponseDTO;

public interface UserService {
    
    UserResponseDTO registerUser(UserRegistrationRequestDTO requestDTO);
    
    UserResponseDTO getUserById(Long userId);
    
    List<UserResponseDTO> getAllUsers();
    
    UserResponseDTO updateUser(Long userId, UserRegistrationRequestDTO requestDTO);
    
    void deleteUser(Long userId);
}
