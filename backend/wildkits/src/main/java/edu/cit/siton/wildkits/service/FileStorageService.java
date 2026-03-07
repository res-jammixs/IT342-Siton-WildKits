package edu.cit.siton.wildkits.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    String uploadStudentIdImage(MultipartFile file, String userId) throws Exception;
    void deleteFile(String fileUrl);
}
