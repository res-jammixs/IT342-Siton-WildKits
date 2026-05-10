package edu.cit.siton.wildkits.features.product;

import edu.cit.siton.wildkits.features.product.dto.ProductRequestDTO;
import edu.cit.siton.wildkits.features.product.dto.ProductResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponseDTO createProduct(ProductRequestDTO requestDTO);

    ProductResponseDTO getProductById(Long productId);

    List<ProductResponseDTO> getAllProducts();

    List<ProductResponseDTO> getProductsByUserId(UUID userId);

    ProductResponseDTO updateProduct(Long productId, ProductRequestDTO requestDTO);

    void deleteProduct(Long productId);

    String uploadProductImage(MultipartFile image, String userId) throws Exception;
}