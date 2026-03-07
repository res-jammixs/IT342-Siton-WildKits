package edu.cit.siton.wildkits.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReportRequestDTO {

    @NotBlank(message = "Reason is required")
    @Size(min = 10, max = 5000, message = "Reason must be between 10 and 5000 characters")
    private String reason;

    @NotNull(message = "Reporter user ID is required")
    private UUID reporterUserId;

    @NotNull(message = "Product ID is required")
    private Long productId;
}
