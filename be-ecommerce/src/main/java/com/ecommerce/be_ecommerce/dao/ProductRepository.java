package com.ecommerce.be_ecommerce.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import com.ecommerce.be_ecommerce.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> findByCategoryIdAndNameContaining(@Param("id") Long id,
                                                      @Param("name") String name,
                                                      Pageable pageable);
    
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

}
