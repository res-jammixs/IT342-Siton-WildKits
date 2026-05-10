package edu.cit.siton.wildkits.features.product;

import edu.cit.siton.wildkits.features.product.dto.ProductRequestDTO;
import edu.cit.siton.wildkits.features.product.dto.ProductResponseDTO;
import edu.cit.siton.wildkits.features.user.User;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequestDTO dto, User user) {
        return Product.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .category(dto.getCategory())
                .condition(dto.getCondition())
                .imageUrl(dto.getImageUrl())
                .type(dto.getType())
                .status(ProductStatus.AVAILABLE)
                .user(user)
                .build();
    }

    public ProductResponseDTO toResponseDTO(Product product) {
        return ProductResponseDTO.builder()
                .productId(product.getProductId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory())
                .condition(product.getCondition())
                .imageUrl(product.getImageUrl())
                .type(product.getType())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .userId(product.getUser() != null ? product.getUser().getUserId() : null)
                .userName(product.getUser() != null ? product.getUser().getName() : null)
                .build();
    }
}