<?php
/**
 * Controlador de la página principal
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Product.php';
require_once APP_PATH . 'models/Category.php';
require_once APP_PATH . 'core/Database.php';

class HomeController extends BaseController {
    
    private $productModel;
    private $categoryModel;
    
    public function __construct() {
        $this->productModel = new Product();
        $this->categoryModel = new Category();
    }
    
    public function index() {
        $data = [
            'title' => 'Inicio - MultiShop',
            'current_page' => 'home',
            'categories' => $this->categoryModel->getAll(),
            'featured_products' => $this->productModel->getFeatured(8),
            'recent_products' => $this->productModel->getRecent(8)
        ];
        
        $this->render('home/index', $data);
    }
    
    private function getFeaturedProducts() {
        // Por ahora datos de ejemplo, luego conectar con modelo
        return [
            [
                'id' => 1,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-1.jpg',
                'rating' => 5,
                'reviews' => 99
            ],
            [
                'id' => 2,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-2.jpg',
                'rating' => 4,
                'reviews' => 85
            ],
            [
                'id' => 3,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-3.jpg',
                'rating' => 5,
                'reviews' => 120
            ],
            [
                'id' => 4,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-4.jpg',
                'rating' => 4,
                'reviews' => 67
            ]
        ];
    }
    
    private function getCategories() {
        return [
            [
                'id' => 1,
                'name' => "Men's Dresses",
                'image' => 'cat-1.jpg',
                'products_count' => 15
            ],
            [
                'id' => 2,
                'name' => "Women's Dresses",
                'image' => 'cat-2.jpg',
                'products_count' => 20
            ],
            [
                'id' => 3,
                'name' => "Baby's Dresses",
                'image' => 'cat-3.jpg',
                'products_count' => 10
            ],
            [
                'id' => 4,
                'name' => 'Accerssories',
                'image' => 'cat-4.jpg',
                'products_count' => 25
            ]
        ];
    }
    
    private function getRecentProducts() {
        return [
            [
                'id' => 5,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-5.jpg',
                'rating' => 5,
                'reviews' => 99
            ],
            [
                'id' => 6,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-6.jpg',
                'rating' => 4,
                'reviews' => 85
            ],
            [
                'id' => 7,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-7.jpg',
                'rating' => 5,
                'reviews' => 120
            ],
            [
                'id' => 8,
                'name' => 'Product Name Goes Here',
                'price' => 123.00,
                'old_price' => 145.00,
                'image' => 'product-8.jpg',
                'rating' => 4,
                'reviews' => 67
            ]
        ];
    }
}