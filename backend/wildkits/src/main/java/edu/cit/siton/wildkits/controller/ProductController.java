package edu.cit.siton.wildkits.controller;

import edu.cit.siton.wildkits.dto.ProductRequestDTO;
import edu.cit.siton.wildkits.dto.ProductResponseDTO;
import edu.cit.siton.wildkits.enums.ProductType;
import edu.cit.siton.wildkits.service.FileStorageService;
import edu.cit.siton.wildkits.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRequestDTO requestDTO) {
        log.info("Received request to create product with title: {}", requestDTO.getTitle());
        ProductResponseDTO response = productService.createProduct(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping(value = "/with-image", consumes = {"multipart/form-data"})
    public ResponseEntity<ProductResponseDTO> createProductWithImage(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("type") String type,
            @RequestParam("category") String category,
            @RequestParam(value = "condition", required = false) String condition,
            @RequestParam("userId") UUID userId,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        ProductRequestDTO requestDTO = ProductRequestDTO.builder()
                .title(title)
                .description(description)
                .price(price)
                .type(ProductType.valueOf(type.toUpperCase()))
                .category(category)
                .condition(condition)
                .userId(userId)
                .build();

        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.uploadProductImage(image, userId.toString());
            requestDTO.setImageUrl(imageUrl);
        }

        log.info("Received multipart request to create product with title: {}", title);
        ProductResponseDTO response = productService.createProduct(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        log.info("Received request to get all products");
        List<ProductResponseDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable("id") Long productId) {
        log.info("Received request to get product with ID: {}", productId);
        ProductResponseDTO product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProductResponseDTO>> getProductsByUserId(@PathVariable("userId") UUID userId) {
        log.info("Received request to get products for user ID: {}", userId);
        List<ProductResponseDTO> products = productService.getProductsByUserId(userId);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable("id") Long productId,
            @Valid @RequestBody ProductRequestDTO requestDTO) {
        log.info("Received request to update product with ID: {}", productId);
        ProductResponseDTO response = productService.updateProduct(productId, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable("id") Long productId) {
        log.info("Received request to delete product with ID: {}", productId);
        productService.deleteProduct(productId);
        return ResponseEntity.noContent().build();
    }
}
