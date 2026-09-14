<?php
/**
 * Migración 002 — Datos dinámicos (catálogo, carrito, favoritos, cuenta).
 *
 * Aditiva e idempotente: se puede ejecutar varias veces sin errores y no
 * borra ni altera datos existentes.
 *
 * Uso:  php scripts/migracion_catalogo.php
 */

$config = require __DIR__ . '/../config/database.php';

$dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $config['host'], $config['database'], $config['charset']);
$pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);

function tablaExiste(PDO $pdo, string $tabla): bool {
    $sql = 'SELECT COUNT(*) FROM information_schema.tables
            WHERE table_schema = DATABASE() AND table_name = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$tabla]);
    return (bool)$stmt->fetchColumn();
}

function columnaExiste(PDO $pdo, string $tabla, string $columna): bool {
    $sql = 'SELECT COUNT(*) FROM information_schema.columns
            WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$tabla, $columna]);
    return (bool)$stmt->fetchColumn();
}

function indiceExiste(PDO $pdo, string $tabla, string $indice): bool {
    $sql = 'SELECT COUNT(*) FROM information_schema.statistics
            WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$tabla, $indice]);
    return (bool)$stmt->fetchColumn();
}

function filas(PDO $pdo, string $tabla): int {
    return (int)$pdo->query("SELECT COUNT(*) FROM `$tabla`")->fetchColumn();
}

function logPaso(string $mensaje): void {
    echo $mensaje . PHP_EOL;
}

// ---------------------------------------------------------------------------
// 1. Esquema
// ---------------------------------------------------------------------------

if (!tablaExiste($pdo, 'brands')) {
    $pdo->exec('CREATE TABLE brands (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
    logPaso('Creada tabla brands');
}

if (!columnaExiste($pdo, 'products', 'brand_id')) {
    $pdo->exec('ALTER TABLE products ADD COLUMN brand_id INT NULL');
    $pdo->exec('ALTER TABLE products ADD CONSTRAINT fk_products_brand
                FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL');
    logPaso('Añadida products.brand_id');
}

if (!columnaExiste($pdo, 'products', 'is_new')) {
    $pdo->exec('ALTER TABLE products ADD COLUMN is_new TINYINT(1) NOT NULL DEFAULT 0');
    logPaso('Añadida products.is_new');
}

if (!tablaExiste($pdo, 'product_images')) {
    $pdo->exec('CREATE TABLE product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
            REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
    logPaso('Creada tabla product_images');
}

if (!tablaExiste($pdo, 'product_variants')) {
    $pdo->exec('CREATE TABLE product_variants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        size VARCHAR(20) NOT NULL,
        color_name VARCHAR(50) NOT NULL,
        color_hex VARCHAR(9) NOT NULL,
        stock INT NOT NULL DEFAULT 10,
        CONSTRAINT fk_product_variants_product FOREIGN KEY (product_id)
            REFERENCES products(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4');
    logPaso('Creada tabla product_variants');
}

if (!columnaExiste($pdo, 'cart_items', 'size')) {
    $pdo->exec('ALTER TABLE cart_items ADD COLUMN size VARCHAR(20) NULL');
    logPaso('Añadida cart_items.size');
}

if (!columnaExiste($pdo, 'cart_items', 'color_name')) {
    $pdo->exec('ALTER TABLE cart_items ADD COLUMN color_name VARCHAR(50) NULL');
    logPaso('Añadida cart_items.color_name');
}

if (!indiceExiste($pdo, 'cart_items', 'uq_cart_variant')) {
    $pdo->exec('ALTER TABLE cart_items ADD UNIQUE KEY uq_cart_variant
                (session_id, product_id, size, color_name)');
    logPaso('Añadido índice único uq_cart_variant');
}

if (!columnaExiste($pdo, 'wishlist_items', 'session_id')) {
    $pdo->exec('ALTER TABLE wishlist_items ADD COLUMN session_id VARCHAR(255) NULL');
    $pdo->exec('ALTER TABLE wishlist_items MODIFY user_id INT NULL');
    logPaso('Añadida wishlist_items.session_id (user_id ahora nullable)');
}

if (!indiceExiste($pdo, 'wishlist_items', 'uq_wishlist_session')) {
    $pdo->exec('ALTER TABLE wishlist_items ADD UNIQUE KEY uq_wishlist_session (session_id, product_id)');
    logPaso('Añadido índice único uq_wishlist_session');
}

// ---------------------------------------------------------------------------
// 2. Semillas
// ---------------------------------------------------------------------------

if (filas($pdo, 'brands') === 0) {
    $pdo->exec("INSERT INTO brands (name, slug) VALUES
        ('Zara', 'zara'), ('Nike', 'nike'), ('Adidas', 'adidas'), ('H&M', 'hm')");
    logPaso('Sembradas 4 marcas');
}

$marcasPorProducto = [1 => 'zara', 2 => 'hm', 3 => 'zara', 4 => 'adidas', 5 => 'hm',
                      6 => 'nike', 7 => 'adidas', 8 => 'zara', 9 => 'zara'];
$idsMarcas = [];
foreach ($pdo->query('SELECT id, slug FROM brands') as $fila) {
    $idsMarcas[$fila['slug']] = (int)$fila['id'];
}
foreach ($marcasPorProducto as $productoId => $slug) {
    $stmt = $pdo->prepare('UPDATE products SET brand_id = ? WHERE id = ? AND brand_id IS NULL');
    $stmt->execute([$idsMarcas[$slug] ?? null, $productoId]);
}

$novedades = [1, 3, 6, 8];
$stmt = $pdo->prepare('UPDATE products SET is_new = 1 WHERE id = ?');
foreach ($novedades as $productoId) {
    $stmt->execute([$productoId]);
}

if (filas($pdo, 'product_images') === 0) {
    $productos = $pdo->query('SELECT id, image, category_id FROM products ORDER BY id')->fetchAll();
    $insertar = $pdo->prepare('INSERT INTO product_images (product_id, image_url, sort_order) VALUES (?, ?, ?)');
    foreach ($productos as $producto) {
        $principal = '/img/' . ($producto['image'] ?: 'product-' . $producto['id'] . '.jpg');
        $secundaria = '/img/cat-' . ((($producto['category_id'] - 1) % 4) + 1) . '.jpg';
        $insertar->execute([$producto['id'], $principal, 0]);
        $insertar->execute([$producto['id'], $secundaria, 1]);
    }
    logPaso('Sembradas las imágenes de producto');
}

if (filas($pdo, 'product_variants') === 0) {
    $paleta = [
        ['Negro', '#111111'],
        ['Blanco', '#ffffff'],
        ['Camel', '#b98a4b'],
    ];
    $productos = $pdo->query('SELECT id, category_id FROM products ORDER BY id')->fetchAll();
    $insertar = $pdo->prepare('INSERT INTO product_variants (product_id, size, color_name, color_hex)
                               VALUES (?, ?, ?, ?)');
    foreach ($productos as $producto) {
        if ((int)$producto['category_id'] === 7) {
            $tallas = ['38', '39', '40', '41', '42', '43', '44'];
        } elseif ((int)$producto['category_id'] === 9) {
            $tallas = ['Única'];
        } else {
            $tallas = ['XS', 'S', 'M', 'L', 'XL'];
        }
        foreach ($tallas as $talla) {
            foreach ($paleta as [$nombre, $hex]) {
                $insertar->execute([$producto['id'], $talla, $nombre, $hex]);
            }
        }
    }
    logPaso('Sembradas las variantes (talla/color)');
}

if (filas($pdo, 'users') === 0) {
    $stmt = $pdo->prepare('INSERT INTO users (email, password, first_name, last_name, is_active)
                           VALUES (?, ?, ?, ?, 1)');
    $stmt->execute([
        'demo@zara.test',
        password_hash('demo1234', PASSWORD_DEFAULT),
        'Ana',
        'García',
    ]);
    logPaso('Sembrado usuario demo (demo@zara.test / demo1234)');
}

logPaso('Migración 002 completada.');
