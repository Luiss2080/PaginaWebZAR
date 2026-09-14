-- Migración 002 — Datos dinámicos con la base de datos
-- Referencia del esquema. La aplicación idempotente vive en
-- scripts/migracion_catalogo.php (ejecutar: php scripts/migracion_catalogo.php).

CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE products
    ADD COLUMN brand_id INT NULL,
    ADD COLUMN is_new TINYINT(1) NOT NULL DEFAULT 0,
    ADD CONSTRAINT fk_products_brand FOREIGN KEY (brand_id)
        REFERENCES brands(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS product_variants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    size VARCHAR(20) NOT NULL,
    color_name VARCHAR(50) NOT NULL,
    color_hex VARCHAR(9) NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id)
        REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE cart_items
    ADD COLUMN size VARCHAR(20) NULL,
    ADD COLUMN color_name VARCHAR(50) NULL,
    ADD UNIQUE KEY uq_cart_variant (session_id, product_id, size, color_name);

ALTER TABLE wishlist_items
    ADD COLUMN session_id VARCHAR(255) NULL,
    MODIFY user_id INT NULL,
    ADD UNIQUE KEY uq_wishlist_session (session_id, product_id);

-- Semillas: 4 marcas, asignación de marca, novedades, imágenes y variantes.
-- Ver scripts/migracion_catalogo.php para los valores concretos.
