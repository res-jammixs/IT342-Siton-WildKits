package com.wildkits.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wildkits.dto.LoginRequestDTO;
import com.wildkits.dto.UserRegistrationRequestDTO;
import com.wildkits.dto.UserResponseDTO;
import com.wildkits.entity.User;
import com.wildkits.exception.DuplicateResourceException;
import com.wildkits.exception.ResourceNotFoundException;
import com.wildkits.mapper.UserMapper;
import com.wildkits.repository.UserRepository;
import com.wildkits.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDTO registerUser(UserRegistrationRequestDTO requestDTO) {
        log.info("Registering new user with email: {}", requestDTO.getEmail());
        
        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("User with email " + requestDTO.getEmail() + " already exists");
        }
        
        User user = userMapper.toEntity(requestDTO);
        User savedUser = userRepository.save(user);
        
        log.info("User registered successfully with ID: {}", savedUser.getUserId());
        return userMapper.toResponseDTO(savedUser);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO login(LoginRequestDTO requestDTO) {
        log.info("Attempting login for email: {}", requestDTO.getEmail());
        
        User user = userRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid email or password"));
        
        // Simple password check (in production, use BCrypt or similar)
        if (!user.getPassword().equals(requestDTO.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }
        
        log.info("User logged in successfully with ID: {}", user.getUserId());
        return userMapper.toResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(Long userId) {
        log.info("Fetching user with ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        return userMapper.toResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserResponseDTO> getAllUsers() {
        log.info("Fetching all users");
        
        return userRepository.findAll().stream()
                .map(userMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO updateUser(Long userId, UserRegistrationRequestDTO requestDTO) {
        log.info("Updating user with ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());
        
        User updatedUser = userRepository.save(user);
        
        log.info("User updated successfully with ID: {}", updatedUser.getUserId());
        return userMapper.toResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        log.info("Deleting user with ID: {}", userId);
        
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        
        userRepository.deleteById(userId);
        log.info("User deleted successfully with ID: {}", userId);
    }
}
