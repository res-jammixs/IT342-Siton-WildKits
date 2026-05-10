package edu.cit.siton.wildkits.features.product;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    public String uploadStudentIdImage(MultipartFile file, String email) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }
        return "uploads/student-id/" + email + "/" + file.getOriginalFilename();
    }

    public String uploadProductImage(MultipartFile file, String userId) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }
        return "uploads/products/" + userId + "/" + file.getOriginalFilename();
    }
}