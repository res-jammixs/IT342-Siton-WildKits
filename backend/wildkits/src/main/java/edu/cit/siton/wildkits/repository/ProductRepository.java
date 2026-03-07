package edu.cit.siton.wildkits.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.cit.siton.wildkits.entity.Product;
import edu.cit.siton.wildkits.enums.ProductStatus;
import edu.cit.siton.wildkits.enums.ProductType;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    @Query("SELECT p FROM Product p WHERE p.user.userId = :userId")
    List<Product> findByUserId(@Param("userId") UUID userId);
    
    List<Product> findByStatus(ProductStatus status);
    
    List<Product> findByType(ProductType type);
    
    List<Product> findByStatusAndType(ProductStatus status, ProductType type);
}
