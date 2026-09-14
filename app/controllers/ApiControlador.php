<?php
/**
 * API JSON para la SPA.
 *
 * Expone en /api/... los datos de la app legada en el formato que consume
 * frontend/src/servicios/api.js.
 *
 * Consulta directamente el esquema real de multishop_db
 * (products.is_active / is_featured / is_new / sale_price / image, categories,
 * brands, product_images y product_variants).
 *
 * Rutas resueltas por el fallback dinámico de app/core/App.php (el verbo se
 * decide dentro de cada método con $_SERVER['REQUEST_METHOD']):
 *   GET  /api/productos        -> productos()
 *   GET  /api/productos/{id}   -> productos($id)
 *   GET  /api/categorias       -> categorias()
 *   GET  /api/marcas           -> marcas()
 *   GET  /api/buscar?q=...     -> buscar()
 */

require_once 'BaseController.php';
require_once APP_PATH . 'core/Database.php';

class ApiControlador extends BaseController {

    public function productos($id = null) {
        $categorias = $this->mapa('categories');
        $marcas = $this->mapa('brands');
        $imagenes = $this->imagenesPorProducto();
        $variantes = $this->variantesPorProducto();

        $campos = 'id, name, slug, description, price, sale_price, category_id,
                   brand_id, image, is_featured, is_new';

        if ($id !== null) {
            $fila = $this->uno(
                "SELECT $campos FROM products WHERE id = ? AND is_active = 1",
                [$id]
            );
            $this->json(
                $fila ? $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes) : null
            );
        }

        $filas = $this->consultar("SELECT $campos FROM products WHERE is_active = 1 ORDER BY created_at DESC");
        $datos = array_map(
            fn($fila) => $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes),
            $filas
        );
        $this->json($datos);
    }

    public function categorias() {
        $filas = $this->consultar(
            'SELECT id, name, slug, description FROM categories WHERE is_active = 1 ORDER BY name'
        );
        $datos = array_map(fn($fila) => [
            'id' => (int)$fila['id'],
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
            'descripcion' => $fila['description'] ?? '',
            'imagen' => '/img/cat-' . ((((int)$fila['id'] - 1) % 4) + 1) . '.jpg',
        ], $filas);
        $this->json($datos);
    }

    public function marcas() {
        $filas = $this->consultar('SELECT id, name, slug FROM brands ORDER BY name');
        $datos = array_map(fn($fila) => [
            'id' => (int)$fila['id'],
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
        ], $filas);
        $this->json($datos);
    }

    public function buscar() {
        $termino = trim($_GET['q'] ?? '');
        if ($termino === '') {
            $this->json([]);
        }

        $categorias = $this->mapa('categories');
        $marcas = $this->mapa('brands');
        $imagenes = $this->imagenesPorProducto();
        $variantes = $this->variantesPorProducto();

        $filas = $this->consultar(
            'SELECT id, name, slug, description, price, sale_price, category_id, brand_id,
                    image, is_featured, is_new
             FROM products
             WHERE is_active = 1 AND (name LIKE ? OR description LIKE ?)
             ORDER BY name LIMIT 8',
            ['%' . $termino . '%', '%' . $termino . '%']
        );
        $datos = array_map(
            fn($fila) => $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes),
            $filas
        );
        $this->json($datos);
    }

    private function formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes) {
        $id = (int)$fila['id'];
        $precio = (float)$fila['price'];
        $oferta = $fila['sale_price'] !== null ? (float)$fila['sale_price'] : null;
        $tieneOferta = $oferta !== null && $oferta > 0 && $oferta < $precio;

        $imagenProducto = $imagenes[$id] ?? [$this->imagenProducto($id, $fila['image'])];
        $variante = $variantes[$id] ?? ['tallas' => [], 'colores' => []];

        return [
            'id' => $id,
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
            'descripcion' => $fila['description'] ?? '',
            'precio' => $tieneOferta ? $oferta : $precio,
            'precioAnterior' => $tieneOferta ? $precio : null,
            'categoria' => $categorias[(int)$fila['category_id']] ?? '',
            'marca' => $marcas[(int)$fila['brand_id']] ?? '',
            'imagenes' => $imagenProducto,
            'tallas' => $variante['tallas'],
            'colores' => $variante['colores'],
            'destacado' => (bool)$fila['is_featured'],
            'novedad' => (bool)$fila['is_new'],
        ];
    }

    private function imagenesPorProducto() {
        $filas = $this->consultar(
            'SELECT product_id, image_url FROM product_images ORDER BY product_id, sort_order, id'
        );
        $mapa = [];
        foreach ($filas as $fila) {
            $mapa[(int)$fila['product_id']][] = $fila['image_url'];
        }
        return $mapa;
    }

    private function variantesPorProducto() {
        $filas = $this->consultar(
            'SELECT product_id, size, color_name, color_hex
             FROM product_variants ORDER BY product_id, id'
        );
        $mapa = [];
        foreach ($filas as $fila) {
            $producto = (int)$fila['product_id'];
            if (!isset($mapa[$producto])) {
                $mapa[$producto] = ['tallas' => [], 'colores' => [], '_colores' => []];
            }
            if (!in_array($fila['size'], $mapa[$producto]['tallas'], true)) {
                $mapa[$producto]['tallas'][] = $fila['size'];
            }
            $nombre = $fila['color_name'];
            if (!isset($mapa[$producto]['_colores'][$nombre])) {
                $mapa[$producto]['_colores'][$nombre] = true;
                $mapa[$producto]['colores'][] = ['nombre' => $nombre, 'hex' => $fila['color_hex']];
            }
        }
        foreach ($mapa as $producto => $valores) {
            unset($mapa[$producto]['_colores']);
        }
        return $mapa;
    }

    private function imagenProducto($id, $archivo) {
        if (!empty($archivo)) {
            return '/img/' . ltrim($archivo, '/');
        }
        return '/img/product-' . ((($id - 1) % 9) + 1) . '.jpg';
    }

    private function mapa($tabla) {
        $filas = $this->consultar("SELECT id, slug FROM {$tabla}");
        $mapa = [];
        foreach ($filas as $fila) {
            $mapa[(int)$fila['id']] = $fila['slug'];
        }
        return $mapa;
    }

    private function consultar($sql, $params = []) {
        try {
            $db = Database::connect();
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $error) {
            error_log('Error en la API: ' . $error->getMessage());
            return [];
        }
    }

    private function uno($sql, $params = []) {
        $filas = $this->consultar($sql, $params);
        return $filas[0] ?? null;
    }
}
