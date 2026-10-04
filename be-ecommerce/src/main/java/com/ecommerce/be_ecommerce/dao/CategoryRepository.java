package com.ecommerce.be_ecommerce.dao;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.be_ecommerce.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
