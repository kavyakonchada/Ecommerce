-- -----------------------------------------------------
-- Schema full-stack-ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ecommerce`;

CREATE SCHEMA `ecommerce`;
USE `ecommerce` ;

-- -----------------------------------------------------
-- Table `ecommerce`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`categories` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE=InnoDB
AUTO_INCREMENT = 1;

-- -----------------------------------------------------
-- Table `ecommerce`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`products` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `category_id` BIGINT(20) NOT NULL,
  `unit_price` DECIMAL(13,2) DEFAULT NULL,
  `image_url` VARCHAR(255) DEFAULT NULL,
  `active` BIT DEFAULT 1,
  `units_in_stock` INT(11) DEFAULT NULL,
  `created_at` DATETIME(6) DEFAULT NULL,
  `updated_at` DATETIME(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) 
ENGINE=InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Add sample data
-- -----------------------------------------------------

INSERT INTO categories(name) VALUES ('BOOKS');

INSERT INTO products (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, created_at, updated_at)
VALUES ('BOOK-TECH-1000', 'JavaScript - The Fun Parts', 'Explore values, closures, functions, and the event loop through concise browser examples that reveal the language behavior behind everyday interactions.',
'assets/images/products/placeholder.png'
,1,100,19.99,1, NOW(), NOW());

INSERT INTO products (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, created_at, updated_at)
VALUES ('BOOK-TECH-1001', 'Spring Framework Tutorial', 'Follow a Java application from dependency injection and MVC through data access and testing, building a clear foundation for layered Spring services.',
'assets/images/products/placeholder.png'
,1,100,29.99,1, NOW(), NOW());

INSERT INTO products (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, created_at, updated_at)
VALUES ('BOOK-TECH-1002', 'Kubernetes - Deploying Containers', 'Understand pods, deployments, services, and configuration as you move a containerized application from a local cluster toward a reliable rollout.',
'assets/images/products/placeholder.png'
,1,100,24.99,1, NOW(), NOW());

INSERT INTO products (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, created_at, updated_at)
VALUES ('BOOK-TECH-1003', 'Internet of Things (IoT) - Getting Started', 'Connect sensors and software with a practical introduction to messaging, connectivity, and data flow, while planning for reliability and device security.',
'assets/images/products/placeholder.png'
,1,100,29.99,1, NOW(), NOW());

INSERT INTO products (sku, name, description, image_url, active, units_in_stock,
unit_price, category_id, created_at, updated_at)
VALUES ('BOOK-TECH-1004', 'The Go Programming Language: A to Z', 'Trace Go from its type system and packages through interfaces, concurrency, and testing, using compact examples to build clear services with the standard library.',
'assets/images/products/placeholder.png'
,1,100,24.99,1, NOW(), NOW());
