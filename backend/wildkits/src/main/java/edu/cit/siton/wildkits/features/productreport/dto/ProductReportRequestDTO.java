package edu.cit.siton.wildkits.features.productreport.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReportRequestDTO {
    private String reason;
    private Long productId;
    private UUID reporterId;
}