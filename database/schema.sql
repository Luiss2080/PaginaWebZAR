-- Esquema de Base de Datos para MultiShop

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS multishop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE multishop_db;

-- Tabla de categorías
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent_id (parent_id),
    INDEX idx_status (status),
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabla de marcas
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    logo VARCHAR(255),
    website VARCHAR(255),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status)
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2) NULL,
    cost_price DECIMAL(10,2) NULL,
    stock_quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 0,
    weight DECIMAL(8,2) DEFAULT 0,
    dimensions VARCHAR(100),
    category_id INT NOT NULL,
    brand_id INT NULL,
    featured BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    meta_title VARCHAR(255),
    meta_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category_id (category_id),
    INDEX idx_brand_id (brand_id),
    INDEX idx_status (status),
    INDEX idx_featured (featured),
    INDEX idx_price (price),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL
);

-- Tabla de imágenes de productos
CREATE TABLE product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_product_id (product_id),
    INDEX idx_is_primary (is_primary),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    role ENUM('customer', 'admin', 'manager') DEFAULT 'customer',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    email_verified_at TIMESTAMP NULL,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- Tabla de direcciones de usuarios
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('billing', 'shipping') DEFAULT 'shipping',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(255),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'México',
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de carrito de compras
CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    session_id VARCHAR(255) NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_session_id (session_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_cart_item (user_id, product_id, session_id)
);

-- Tabla de lista de deseos
CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist_item (user_id, product_id)
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'MXN',
    notes TEXT,
    shipped_at TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_number (order_number),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabla de items del pedido
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_sku VARCHAR(100),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order_id (order_id),
    INDEX idx_product_id (product_id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO categories (name, slug, description, image, sort_order) VALUES
('Ropa Masculina', 'ropa-masculina', 'Colección completa de ropa para hombres', 'cat-1.jpg', 1),
('Ropa Femenina', 'ropa-femenina', 'Colección completa de ropa para mujeres', 'cat-2.jpg', 2),
('Ropa Infantil', 'ropa-infantil', 'Ropa cómoda y divertida para niños', 'cat-3.jpg', 3),
('Accesorios', 'accesorios', 'Complementos y accesorios de moda', 'cat-4.jpg', 4);

INSERT INTO brands (name, slug, description) VALUES
('Nike', 'nike', 'Marca líder en ropa deportiva'),
('Adidas', 'adidas', 'Marca alemana de ropa y calzado deportivo'),
('Zara', 'zara', 'Moda contemporánea para toda la familia'),
('H&M', 'hm', 'Moda rápida y sostenible');

INSERT INTO products (name, slug, description, short_description, sku, price, old_price, stock_quantity, category_id, brand_id, featured) VALUES
('Camiseta Nike Deportiva', 'camiseta-nike-deportiva', 'Camiseta deportiva de alta calidad para entrenamientos', 'Camiseta cómoda y transpirable', 'NK-001', 899.00, 1200.00, 50, 1, 1, 1),
('Vestido Zara Elegante', 'vestido-zara-elegante', 'Vestido elegante para ocasiones especiales', 'Diseño moderno y sofisticado', 'ZR-002', 1299.00, 1599.00, 30, 2, 3, 1),
('Pantalón Adidas Niños', 'pantalon-adidas-ninos', 'Pantalón deportivo para niños activos', 'Cómodo y resistente', 'AD-003', 599.00, 799.00, 40, 3, 2, 1),
('Gorra H&M Casual', 'gorra-hm-casual', 'Gorra casual para uso diario', 'Estilo urbano y moderno', 'HM-004', 299.00, 399.00, 75, 4, 4, 1),
('Sudadera Nike Premium', 'sudadera-nike-premium', 'Sudadera premium con capucha', 'Material de alta calidad', 'NK-005', 1599.00, 1999.00, 25, 1, 1, 0),
('Falda Zara Moderna', 'falda-zara-moderna', 'Falda moderna para mujeres jóvenes', 'Diseño trendy', 'ZR-006', 899.00, 1199.00, 35, 2, 3, 0),
('Playera Adidas Infantil', 'playera-adidas-infantil', 'Playera colorida para niños', 'Colores vibrantes', 'AD-007', 399.00, 499.00, 60, 3, 2, 0),
('Cinturón H&M Clásico', 'cinturon-hm-clasico', 'Cinturón clásico de cuero', 'Estilo atemporal', 'HM-008', 499.00, 699.00, 45, 4, 4, 0);

INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order) VALUES
(1, 'product-1.jpg', 'Camiseta Nike Deportiva', 1, 1),
(2, 'product-2.jpg', 'Vestido Zara Elegante', 1, 1),
(3, 'product-3.jpg', 'Pantalón Adidas Niños', 1, 1),
(4, 'product-4.jpg', 'Gorra H&M Casual', 1, 1),
(5, 'product-5.jpg', 'Sudadera Nike Premium', 1, 1),
(6, 'product-6.jpg', 'Falda Zara Moderna', 1, 1),
(7, 'product-7.jpg', 'Playera Adidas Infantil', 1, 1),
(8, 'product-8.jpg', 'Cinturón H&M Clásico', 1, 1);

INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Admin', 'Sistema', 'admin@multishop.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
('Juan', 'Pérez', 'juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer');