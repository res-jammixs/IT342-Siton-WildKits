package com.wildkits.service.impl;

import com.wildkits.service.FileStorageService;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class SupabaseStorageService implements FileStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.api-key}")
    private String supabaseApiKey;

    @Value("${supabase.storage-bucket}")
    private String bucketName;

    private final OkHttpClient client = new OkHttpClient();
    
    private void validateConfiguration() {
        if (supabaseApiKey == null || supabaseApiKey.equals("your_supabase_anon_key_here")) {
            throw new IllegalStateException(
                "Supabase API key is not configured. Please set SUPABASE_SERVICE_ROLE_KEY environment variable or update application.yml"
            );
        }
        if (supabaseApiKey.contains("\"role\":\"anon\"")) {
            log.warn("WARNING: Using anon key instead of service_role key. This may cause upload failures due to RLS policies.");
            log.warn("Please use the service_role key for backend file uploads. See FIX_STORAGE_403_ERROR.md");
        }
        if (supabaseUrl == null || supabaseUrl.isEmpty()) {
            throw new IllegalStateException("Supabase URL is not configured");
        }
    }
    
    private static final List<String> ALLOWED_MIME_TYPES = Arrays.asList(
            "image/jpeg", "image/jpg", "image/png"
    );
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @Override
    public String uploadStudentIdImage(MultipartFile file, String userId) throws Exception {
        // Validate configuration
        validateConfiguration();
        
        // Validate file
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 5MB limit");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid file type. Only JPEG and PNG images are allowed");
        }

        String fileExtension = getFileExtension(file.getOriginalFilename());
        String fileName = "student_id_" + userId + "_" + UUID.randomUUID() + fileExtension;
        
        log.info("Uploading file to Supabase: {}", fileName);
        
        // Upload to Supabase Storage
        String uploadUrl = String.format("%s/storage/v1/object/%s/%s", 
                supabaseUrl, bucketName, fileName);

        RequestBody requestBody = RequestBody.create(
                file.getBytes(),
                MediaType.parse(contentType)
        );

        Request request = new Request.Builder()
                .url(uploadUrl)
                .post(requestBody)
                .addHeader("Authorization", "Bearer " + supabaseApiKey)
                .addHeader("Content-Type", contentType)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                String errorBody = response.body() != null ? response.body().string() : "Unknown error";
                log.error("Failed to upload file to Supabase: {}", errorBody);
                throw new IOException("Failed to upload file: " + errorBody);
            }

            // Return public URL
            String publicUrl = String.format("%s/storage/v1/object/public/%s/%s", 
                    supabaseUrl, bucketName, fileName);
            
            log.info("File uploaded successfully: {}", publicUrl);
            return publicUrl;
        }
    }

    @Override
    public void deleteFile(String fileUrl) {
        if (fileUrl == null || fileUrl.isEmpty()) {
            return;
        }

        try {
            // Extract file name from URL
            String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
            String deleteUrl = String.format("%s/storage/v1/object/%s/%s", 
                    supabaseUrl, bucketName, fileName);

            Request request = new Request.Builder()
                    .url(deleteUrl)
                    .delete()
                    .addHeader("Authorization", "Bearer " + supabaseApiKey)
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    String errorBody = response.body() != null ? response.body().string() : "Unknown error";
                    log.error("Failed to delete file from Supabase: {}", errorBody);
                } else {
                    log.info("File deleted successfully: {}", fileName);
                }
            }
        } catch (Exception e) {
            log.error("Error deleting file: {}", e.getMessage());
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null) return ".jpg";
        int lastDot = filename.lastIndexOf('.');
        return lastDot == -1 ? ".jpg" : filename.substring(lastDot);
    }
}
