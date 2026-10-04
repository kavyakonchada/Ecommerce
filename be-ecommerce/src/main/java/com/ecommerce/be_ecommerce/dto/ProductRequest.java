package com.ecommerce.be_ecommerce.dto;

import java.math.BigDecimal;

public record ProductRequest(
        Long categoryId,
        String sku,
        String name,
        String description,
        BigDecimal unitPrice,
        String imageUrl,
        boolean active,
        int unitsInStock) {
}