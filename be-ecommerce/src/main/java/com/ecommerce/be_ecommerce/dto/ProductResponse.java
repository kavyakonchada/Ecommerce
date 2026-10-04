package com.ecommerce.be_ecommerce.dto;

import java.math.BigDecimal;
import java.util.Date;

public record ProductResponse(
        Long id,
        Long categoryId,
        String categoryName,
        String sku,
        String name,
        String description,
        BigDecimal unitPrice,
        String imageUrl,
        boolean active,
        int unitsInStock,
        Date createdAt,
        Date updatedAt) {
}