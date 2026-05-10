package edu.cit.siton.wildkits.features.user;

import edu.cit.siton.wildkits.features.user.dto.UserRegistrationRequestDTO;
import edu.cit.siton.wildkits.features.user.dto.UserResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface UserService {

    UserResponseDTO registerUser(UserRegistrationRequestDTO requestDTO);

    UserResponseDTO login(LoginRequestDTO requestDTO);

    UserResponseDTO getUserById(UUID userId);

    List<UserResponseDTO> getAllUsers();

    UserResponseDTO updateUser(UUID userId, UserRegistrationRequestDTO requestDTO);

    void deleteUser(UUID userId);

    UserResponseDTO registerWithImage(String email, String password, String fullName,
                                      String studentId, String department, String yearLevel,
                                      MultipartFile studentIdImage) throws Exception;

    UserResponseDTO updateUserStatus(UUID userId, AccountStatus status);
}