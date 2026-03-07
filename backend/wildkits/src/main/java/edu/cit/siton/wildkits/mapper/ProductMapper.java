package edu.cit.siton.wildkits.mapper;

import org.springframework.stereotype.Component;

import edu.cit.siton.wildkits.dto.ProductRequestDTO;
import edu.cit.siton.wildkits.dto.ProductResponseDTO;
import edu.cit.siton.wildkits.entity.Product;
import edu.cit.siton.wildkits.entity.User;
import edu.cit.siton.wildkits.enums.ProductStatus;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequestDTO dto, User user) {
        return Product.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .price(dto.getPrice())
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
                .type(product.getType())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .userId(product.getUser() != null ? product.getUser().getUserId() : null)
                .userName(product.getUser() != null ? product.getUser().getName() : null)
                .build();
    }
}
