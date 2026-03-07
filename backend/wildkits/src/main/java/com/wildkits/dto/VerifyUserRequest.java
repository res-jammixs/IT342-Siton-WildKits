package com.wildkits.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyUserRequest {
    private String status; // "VERIFIED" or "REJECTED"
}
