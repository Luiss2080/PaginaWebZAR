<?php
/**
 * API JSON para la SPA.
 *
 * Expone en /api/... los datos de la app legada en el formato que consume
 * frontend/src/servicios/api.js.
 *
 * Consulta directamente el esquema real de multishop_db
 * (products.is_active / is_featured / sale_price / image y categories.is_active),
 * que no coincide con database/schema.sql. Los campos que la base de datos no
 * almacena (tallas y colores) se completan con valores por defecto.
 *
 * Rutas resueltas por el fallback dinámico de app/core/App.php:
 *   GET /api/productos        -> ApiControlador::productos()
 *   GET /api/productos/{id}   -> ApiControlador::productos($id)
 *   GET /api/categorias       -> ApiControlador::categorias()
 *   GET /api/marcas           -> ApiControlador::marcas()
 *   GET /api/buscar?q=...     -> ApiControlador::buscar()
 */

require_once 'BaseController.php';
require_once APP_PATH . 'core/Database.php';

class ApiControlador extends BaseController {

    private $tallasPorDefecto = ['XS', 'S', 'M', 'L', 'XL'];

    private $coloresPorDefecto = [
        ['nombre' => 'Negro', 'hex' => '#111111'],
        ['nombre' => 'Blanco', 'hex' => '#ffffff'],
        ['nombre' => 'Camel', 'hex' => '#b98a4b'],
    ];

    public function productos($id = null) {
        $categorias = $this->mapaCategorias();

        if ($id !== null) {
            $fila = $this->uno(
                'SELECT id, name, slug, description, price, sale_price, category_id, image
                 FROM products WHERE id = ? AND is_active = 1',
                [$id]
            );
            $this->json($fila ? $this->formatearProducto($fila, $categorias) : null);
        }

        $filas = $this->consultar(
            'SELECT id, name, slug, description, price, sale_price, category_id, image
             FROM products WHERE is_active = 1 ORDER BY created_at DESC'
        );
        $datos = array_map(fn($fila) => $this->formatearProducto($fila, $categorias), $filas);
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
            'imagen' => $this->imagenCategoria((int)$fila['id']),
        ], $filas);
        $this->json($datos);
    }

    public function marcas() {
        $this->json([]);
    }

    public function buscar() {
        $termino = trim($_GET['q'] ?? '');
        if ($termino === '') {
            $this->json([]);
        }

        $categorias = $this->mapaCategorias();
        $filas = $this->consultar(
            'SELECT id, name, slug, description, price, sale_price, category_id, image
             FROM products
             WHERE is_active = 1 AND (name LIKE ? OR description LIKE ?)
             ORDER BY name LIMIT 8',
            ['%' . $termino . '%', '%' . $termino . '%']
        );
        $datos = array_map(fn($fila) => $this->formatearProducto($fila, $categorias), $filas);
        $this->json($datos);
    }

    private function formatearProducto($fila, $categorias) {
        $precio = (float)$fila['price'];
        $oferta = $fila['sale_price'] !== null ? (float)$fila['sale_price'] : null;
        $tieneOferta = $oferta !== null && $oferta > 0 && $oferta < $precio;

        return [
            'id' => (int)$fila['id'],
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
            'descripcion' => $fila['description'] ?? '',
            'precio' => $tieneOferta ? $oferta : $precio,
            'precioAnterior' => $tieneOferta ? $precio : null,
            'categoria' => $categorias[(int)$fila['category_id']] ?? '',
            'marca' => 'ZARA',
            'imagenes' => [$this->imagenProducto($fila['id'], $fila['image'])],
            'tallas' => $this->tallasPorDefecto,
            'colores' => $this->coloresPorDefecto,
            'destacado' => false,
            'novedad' => false,
        ];
    }

    private function imagenProducto($id, $archivo) {
        if (!empty($archivo)) {
            return '/img/' . ltrim($archivo, '/');
        }
        return '/img/product-' . ((($id - 1) % 9) + 1) . '.jpg';
    }

    private function imagenCategoria($id) {
        return '/img/cat-' . ((($id - 1) % 4) + 1) . '.jpg';
    }

    private function mapaCategorias() {
        $filas = $this->consultar('SELECT id, slug FROM categories WHERE is_active = 1');
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
