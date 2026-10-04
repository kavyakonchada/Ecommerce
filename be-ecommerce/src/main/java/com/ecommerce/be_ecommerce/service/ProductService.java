package com.ecommerce.be_ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import com.ecommerce.be_ecommerce.dao.CategoryRepository;
import com.ecommerce.be_ecommerce.dao.ProductRepository;
import com.ecommerce.be_ecommerce.dto.ProductRequest;
import com.ecommerce.be_ecommerce.dto.ProductResponse;
import com.ecommerce.be_ecommerce.entity.Category;
import com.ecommerce.be_ecommerce.entity.Product;

@Service
@Transactional(readOnly = true)
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<ProductResponse> findAll(Long categoryId, String name, Pageable pageable) {
        boolean hasName = StringUtils.hasText(name);
        Page<Product> products;

        if (categoryId != null && hasName) {
            products = productRepository.findByCategoryIdAndNameContaining(categoryId, name.trim(), pageable);
        } else if (categoryId != null) {
            products = productRepository.findByCategoryId(categoryId, pageable);
        } else if (hasName) {
            products = productRepository.findByNameContaining(name.trim(), pageable);
        } else {
            products = productRepository.findAll(pageable);
        }

        return products.map(this::toResponse);
    }

    public ProductResponse findById(Long id) {
        return toResponse(getProduct(id));
    }

    @Transactional
    public ProductResponse create(ProductRequest request) {
        Product product = new Product();
        applyRequest(product, request);
        return toResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = getProduct(id);
        applyRequest(product, request);
        return toResponse(productRepository.save(product));
    }

    @Transactional
    public void delete(Long id) {
        productRepository.delete(getProduct(id));
    }

    private Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Product not found: " + id));
    }

    private void applyRequest(Product product, ProductRequest request) {
        if (request == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product details are required");
        }

        if (request.categoryId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "categoryId is required");
        }

        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Category not found: " + request.categoryId()));

        product.setCategory(category);
        product.setSku(request.sku());
        product.setName(request.name());
        product.setDescription(request.description());
        product.setUnitPrice(request.unitPrice());
        product.setImageUrl(request.imageUrl());
        product.setActive(request.active());
        product.setUnitsInStock(request.unitsInStock());
    }

    private ProductResponse toResponse(Product product) {
        Category category = product.getCategory();
        return new ProductResponse(
                product.getId(),
                category.getId(),
                category.getName(),
                product.getSku(),
                product.getName(),
                product.getDescription(),
                product.getUnitPrice(),
                product.getImageUrl(),
                product.isActive(),
                product.getUnitsInStock(),
                product.getCreatedAt(),
                product.getUpdatedAt());
    }
}