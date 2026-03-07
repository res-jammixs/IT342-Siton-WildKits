package edu.cit.siton.wildkits.service.impl;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import edu.cit.siton.wildkits.dto.LoginRequestDTO;
import edu.cit.siton.wildkits.dto.UserRegistrationRequestDTO;
import edu.cit.siton.wildkits.dto.UserResponseDTO;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.AccountStatus;
import edu.cit.siton.wildkits.enums.Department;
import edu.cit.siton.wildkits.enums.YearLevel;
import edu.cit.siton.wildkits.exception.DuplicateResourceException;
import edu.cit.siton.wildkits.exception.ResourceNotFoundException;
import edu.cit.siton.wildkits.mapper.UserMapper;
import edu.cit.siton.wildkits.repository.UserRepository;
import edu.cit.siton.wildkits.service.FileStorageService;
import edu.cit.siton.wildkits.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;

    @Override
    public UserResponseDTO registerUser(UserRegistrationRequestDTO requestDTO) {
        log.info("Registering new user with email: {}", requestDTO.getEmail());
        
        // Check for duplicate email
        if (userRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("User with email " + requestDTO.getEmail() + " already exists");
        }
        
        // Check for duplicate student ID
        if (userRepository.existsByStudentId(requestDTO.getStudentId())) {
            throw new DuplicateResourceException("User with student ID " + requestDTO.getStudentId() + " already exists");
        }
        
        // Convert DTO to entity
        User user = userMapper.toEntity(requestDTO);
        
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(requestDTO.getPassword());
        user.setPassword(hashedPassword);
        
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
        
        // Verify password using BCrypt
        if (!passwordEncoder.matches(requestDTO.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password");
        }
        
        log.info("User logged in successfully with ID: {}", user.getUserId());
        return userMapper.toResponseDTO(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponseDTO getUserById(UUID userId) {
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
    public UserResponseDTO updateUser(UUID userId, UserRegistrationRequestDTO requestDTO) {
        log.info("Updating user with ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        // Update user fields
        user.setName(requestDTO.getName());
        user.setEmail(requestDTO.getEmail());
        
        // Hash the password before updating
        String hashedPassword = passwordEncoder.encode(requestDTO.getPassword());
        user.setPassword(hashedPassword);
        
        User updatedUser = userRepository.save(user);
        
        log.info("User updated successfully with ID: {}", updatedUser.getUserId());
        return userMapper.toResponseDTO(updatedUser);
    }

    @Override
    public void deleteUser(UUID userId) {
        log.info("Deleting user with ID: {}", userId);
        
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with ID: " + userId);
        }
        
        userRepository.deleteById(userId);
        log.info("User deleted successfully with ID: {}", userId);
    }

    @Override
    public UserResponseDTO registerWithImage(String email, String password, String fullName, 
                                            String studentId, String department, String yearLevel, 
                                            MultipartFile studentIdImage) throws Exception {
        log.info("Registering new user with email: {} and student ID image", email);
        
        // Check for duplicate email
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException("User with email " + email + " already exists");
        }
        
        // Check for duplicate student ID
        if (userRepository.existsByStudentId(studentId)) {
            throw new DuplicateResourceException("User with student ID " + studentId + " already exists");
        }
        
        // Upload student ID image
        String studentIdImageUrl = fileStorageService.uploadStudentIdImage(studentIdImage, email);
        
        // Parse enum values
        Department deptEnum;
        YearLevel yearEnum;
        try {
            deptEnum = Department.valueOf(department.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid department: " + department);
        }
        
        try {
            yearEnum = YearLevel.valueOf(yearLevel.toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid year level: " + yearLevel);
        }
        
        // Create new user
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setName(fullName);
        user.setStudentId(studentId);
        user.setDepartment(deptEnum);
        user.setYearLevel(yearEnum);
        user.setStudentIdImageUrl(studentIdImageUrl);
        user.setAccountStatus(AccountStatus.UNVERIFIED);
        
        User savedUser = userRepository.save(user);
        
        log.info("User registered successfully with ID: {} and image uploaded", savedUser.getUserId());
        return userMapper.toResponseDTO(savedUser);
    }

    @Override
    public UserResponseDTO updateUserStatus(UUID userId, AccountStatus status) {
        log.info("Updating user status for ID: {} to {}", userId, status);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        user.setAccountStatus(status);
        User updatedUser = userRepository.save(user);
        
        log.info("User status updated successfully for ID: {}", userId);
        return userMapper.toResponseDTO(updatedUser);
    }
}
