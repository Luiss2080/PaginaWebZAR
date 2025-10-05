-- Base de datos para MultiShop
CREATE DATABASE IF NOT EXISTS multishop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE multishop_db;

-- Tabla de categorías
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image VARCHAR(255),
    parent_id INT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabla de productos
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    short_description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2) NULL,
    sku VARCHAR(50) UNIQUE,
    stock_quantity INT DEFAULT 0,
    category_id INT NOT NULL,
    image VARCHAR(255),
    gallery TEXT, -- JSON array de imágenes
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    weight DECIMAL(8,2) NULL,
    dimensions VARCHAR(100) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de direcciones de usuarios
CREATE TABLE user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('billing', 'shipping') DEFAULT 'shipping',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    billing_address TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Tabla de items del pedido
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
);

-- Tabla de carrito de compras
CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_id INT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id)
);

-- Tabla de lista de deseos
CREATE TABLE wishlist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_wishlist_item (user_id, product_id)
);

-- Insertar categorías de ejemplo
INSERT INTO categories (name, slug, description) VALUES
('Vestidos', 'vestidos', 'Vestidos para todas las ocasiones'),
('Camisetas', 'camisetas', 'Camisetas cómodas y modernas'),
('Jeans', 'jeans', 'Jeans de alta calidad'),
('Natación', 'natacion', 'Ropa para actividades acuáticas'),
('Ropa para Dormir', 'ropa-dormir', 'Pijamas y ropa de descanso'),
('Ropa Deportiva', 'ropa-deportiva', 'Ropa para ejercicio y deporte'),
('Zapatos', 'zapatos', 'Calzado para toda la familia'),
('Chaquetas', 'chaquetas', 'Chaquetas y abrigos'),
('Accesorios', 'accesorios', 'Complementos y accesorios de moda');

-- Insertar productos de ejemplo
INSERT INTO products (name, slug, description, short_description, price, sale_price, sku, stock_quantity, category_id, image, is_featured) VALUES
('Vestido Elegante Negro', 'vestido-elegante-negro', 'Hermoso vestido negro perfecto para ocasiones especiales', 'Vestido negro elegante', 129.99, 99.99, 'VES001', 25, 1, 'product-1.jpg', TRUE),
('Camiseta Básica Blanca', 'camiseta-basica-blanca', 'Camiseta básica de algodón 100% en color blanco', 'Camiseta básica blanca', 24.99, NULL, 'CAM001', 50, 2, 'product-2.jpg', FALSE),
('Jeans Clásicos Azules', 'jeans-clasicos-azules', 'Jeans de mezclilla clásicos en tono azul', 'Jeans azules clásicos', 79.99, 59.99, 'JEA001', 30, 3, 'product-3.jpg', TRUE),
('Traje de Baño Deportivo', 'traje-bano-deportivo', 'Traje de baño ideal para natación y deportes acuáticos', 'Traje de baño deportivo', 49.99, NULL, 'NAT001', 20, 4, 'product-4.jpg', FALSE),
('Pijama Cómoda', 'pijama-comoda', 'Pijama súper cómoda para un descanso perfecto', 'Pijama cómoda', 39.99, 29.99, 'PIJ001', 35, 5, 'product-5.jpg', FALSE),
('Leggings Deportivos', 'leggings-deportivos', 'Leggings perfectos para ejercicio y yoga', 'Leggings deportivos', 34.99, NULL, 'DEP001', 40, 6, 'product-6.jpg', TRUE),
('Zapatillas Casuales', 'zapatillas-casuales', 'Zapatillas cómodas para uso diario', 'Zapatillas casuales', 89.99, 69.99, 'ZAP001', 15, 7, 'product-7.jpg', FALSE),
('Chaqueta de Invierno', 'chaqueta-invierno', 'Chaqueta cálida perfecta para el invierno', 'Chaqueta de invierno', 149.99, 119.99, 'CHA001', 12, 8, 'product-8.jpg', TRUE),
('Bolso Elegante', 'bolso-elegante', 'Bolso elegante perfecto para cualquier ocasión', 'Bolso elegante', 79.99, NULL, 'ACC001', 18, 9, 'product-9.jpg', FALSE);