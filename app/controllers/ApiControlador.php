<?php
/**
 * API JSON para la SPA.
 *
 * Expone en /api/... los datos de la app legada en el formato que consume
 * frontend/src/servicios/api.js. Los campos que la base de datos no almacena
 * (tallas y colores) se completan con valores por defecto.
 *
 * Rutas resueltas por el fallback dinámico de app/core/App.php:
 *   GET /api/productos        -> ApiControlador::productos()
 *   GET /api/productos/{id}   -> ApiControlador::productos($id)
 *   GET /api/categorias       -> ApiControlador::categorias()
 *   GET /api/marcas           -> ApiControlador::marcas()
 *   GET /api/buscar?q=...     -> ApiControlador::buscar()
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Product.php';
require_once APP_PATH . 'models/Category.php';
require_once APP_PATH . 'core/Database.php';

class ApiControlador extends BaseController {

    private $productModel;
    private $categoryModel;

    private $tallasPorDefecto = ['XS', 'S', 'M', 'L', 'XL'];

    private $coloresPorDefecto = [
        ['nombre' => 'Negro', 'hex' => '#111111'],
        ['nombre' => 'Blanco', 'hex' => '#ffffff'],
        ['nombre' => 'Camel', 'hex' => '#b98a4b'],
    ];

    public function __construct() {
        $this->productModel = new Product();
        $this->categoryModel = new Category();
    }

    public function productos($id = null) {
        $categorias = $this->mapa('categories');
        $marcas = $this->mapa('brands');

        if ($id !== null) {
            $producto = $this->productModel->getById($id);
            $this->json($producto ? $this->formatearProducto($producto, $categorias, $marcas) : null);
        }

        $productos = $this->productModel->getAll();
        $datos = array_map(
            fn($producto) => $this->formatearProducto($producto, $categorias, $marcas),
            $productos
        );
        $this->json($datos);
    }

    public function categorias() {
        $categorias = $this->categoryModel->getAll();
        $datos = array_map(fn($categoria) => [
            'id' => (int)$categoria['id'],
            'nombre' => $categoria['name'],
            'slug' => $categoria['slug'],
            'descripcion' => $categoria['description'] ?? '',
            'imagen' => $this->imagen($categoria['image'] ?? ''),
        ], $categorias);
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
        $productos = $this->productModel->search($termino, 8);
        $datos = array_map(
            fn($producto) => $this->formatearProducto($producto, $categorias, $marcas),
            $productos
        );
        $this->json($datos);
    }

    private function formatearProducto($producto, $categorias, $marcas) {
        $id = (int)$producto['id'];
        $precioAnterior = $producto['old_price'] ?? null;

        return [
            'id' => $id,
            'nombre' => $producto['name'],
            'slug' => $producto['slug'],
            'descripcion' => $producto['description'] ?? '',
            'precio' => (float)$producto['price'],
            'precioAnterior' => $precioAnterior !== null ? (float)$precioAnterior : null,
            'categoria' => $categorias[(int)($producto['category_id'] ?? 0)] ?? '',
            'marca' => $marcas[(int)($producto['brand_id'] ?? 0)] ?? '',
            'imagenes' => [$this->imagen($this->archivoProducto($id))],
            'tallas' => $this->tallasPorDefecto,
            'colores' => $this->coloresPorDefecto,
            'destacado' => (bool)($producto['featured'] ?? false),
            'novedad' => false,
        ];
    }

    private function archivoProducto($id) {
        return 'product-' . ((($id - 1) % 9) + 1) . '.jpg';
    }

    private function imagen($archivo) {
        if ($archivo === '') {
            return '';
        }
        return '/img/' . ltrim($archivo, '/');
    }

    private function mapa($tabla) {
        $filas = $this->consultar("SELECT id, slug FROM {$tabla}");
        $mapa = [];
        foreach ($filas as $fila) {
            $mapa[(int)$fila['id']] = $fila['slug'];
        }
        return $mapa;
    }

    private function consultar($sql) {
        try {
            $db = Database::connect();
            $stmt = $db->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $error) {
            error_log('Error en la API: ' . $error->getMessage());
            return [];
        }
    }
}
