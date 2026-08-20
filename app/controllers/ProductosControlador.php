<?php
/**
 * Controlador de Productos
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Product.php';
require_once APP_PATH . 'models/Category.php';
require_once APP_PATH . 'core/Database.php';

class ProductosControlador extends BaseController {
    
    private $productModel;
    private $categoryModel;
    
    public function __construct() {
        $this->productModel = new Product();
        $this->categoryModel = new Category();
    }
    
    /**
     * Lista de productos (tienda)
     */
    public function index() {
        // Obtener filtros de la URL
        $filters = [
            'category_id' => $this->getGet('category'),
            'min_price' => $this->getGet('min_price'),
            'max_price' => $this->getGet('max_price'),
            'order_by' => $this->getGet('sort', 'created_at'),
            'order_dir' => $this->getGet('dir', 'DESC')
        ];
        
        // Paginación
        $page = (int)$this->getGet('page', 1);
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        
        // Obtener productos y total
        $products = $this->productModel->getWithFilters($filters, $perPage, $offset);
        $total = $this->productModel->countWithFilters($filters);
        $totalPages = ceil($total / $perPage);
        
        $data = [
            'title' => 'Tienda - MultiShop',
            'current_page' => 'shop',
            'products' => $products,
            'categories' => $this->categoryModel->getWithProductCount(),
            'filters' => $filters,
            'pagination' => [
                'current_page' => $page,
                'total_pages' => $totalPages,
                'per_page' => $perPage,
                'total_items' => $total
            ]
        ];
        
        $this->render('productos/index', $data);
    }
    
    /**
     * Detalle del producto
     */
    public function show($id) {
        $product = $this->productModel->getById($id);
        
        if (!$product) {
            $this->redirect('products');
        }
        
        // Productos relacionados
        $relatedProducts = $this->productModel->getByCategory($product['category_id'], 4);
        
        $data = [
            'title' => $product['name'] . ' - MultiShop',
            'current_page' => 'product',
            'product' => $product,
            'related_products' => $relatedProducts
        ];
        
        $this->render('productos/show', $data);
    }
    
    /**
     * Búsqueda de productos
     */
    public function search() {
        $query = $this->getGet('q', '');
        
        if (empty($query)) {
            $this->redirect('products');
        }
        
        $page = (int)$this->getGet('page', 1);
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        
        $products = $this->productModel->search($query, $perPage);
        
        $data = [
            'title' => 'Búsqueda: ' . $query . ' - MultiShop',
            'current_page' => 'search',
            'products' => $products,
            'search_query' => $query,
            'categories' => $this->categoryModel->getWithProductCount()
        ];
        
        $this->render('productos/search', $data);
    }
    
    /**
     * Productos por categoría
     */
    public function category($id) {
        $category = $this->categoryModel->getById($id);
        
        if (!$category) {
            $this->redirect('products');
        }
        
        $page = (int)$this->getGet('page', 1);
        $perPage = 12;
        $offset = ($page - 1) * $perPage;
        
        $products = $this->productModel->getByCategory($id, $perPage);
        
        $data = [
            'title' => $category->name . ' - MultiShop',
            'current_page' => 'category',
            'products' => $products,
            'category' => $category,
            'categories' => $this->categoryModel->getWithProductCount()
        ];
        
        $this->render('productos/category', $data);
    }
    
    /**
     * Agregar reseña de producto
     */
    public function addReview($id) {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('products/' . $id);
        }
        
        $product = $this->productModel->getById($id);
        if (!$product) {
            $this->redirect('products');
        }
        
        // Validar datos
        $name = trim($_POST['name'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $review = trim($_POST['review'] ?? '');
        $rating = (int)($_POST['rating'] ?? 5);
        
        $errors = [];
        
        if (empty($name)) {
            $errors[] = 'El nombre es requerido';
        }
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[] = 'Email válido es requerido';
        }
        
        if (empty($review)) {
            $errors[] = 'La reseña es requerida';
        }
        
        if ($rating < 1 || $rating > 5) {
            $rating = 5;
        }
        
        if (!empty($errors)) {
            $_SESSION['error_messages'] = $errors;
            $this->redirect('products/' . $id);
        }
        
        // Aquí podrías guardar la reseña en base de datos
        // Por ahora solo confirmamos
        $_SESSION['success_message'] = 'Reseña enviada exitosamente. Será revisada antes de publicarse.';
        $this->redirect('products/' . $id);
    }
    
    /**
     * Alias para show - compatibilidad con navegación
     */
    public function details($id) {
        return $this->show($id);
    }
}