<?php
/**
 * Controlador de Usuario (Wishlist, Profile, etc.)
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Product.php';

class UserController extends BaseController {
    
    private $productModel;
    
    public function __construct() {
        $this->productModel = new Product();
    }
    
    /**
     * Lista de deseos (Wishlist)
     */
    public function wishlist() {
        // Por ahora usamos datos de sesión para el wishlist
        $wishlist_ids = $_SESSION['wishlist'] ?? [];
        $products = [];
        
        if (!empty($wishlist_ids)) {
            foreach ($wishlist_ids as $id) {
                $product = $this->productModel->getById($id);
                if ($product) {
                    $products[] = $product;
                }
            }
        }
        
        $data = [
            'title' => 'Lista de Deseos - MultiShop',
            'current_page' => 'wishlist',
            'products' => $products
        ];
        
        $this->render('user/wishlist', $data);
    }
    
    /**
     * Agregar producto a wishlist
     */
    public function add($product_id) {
        if (!isset($_SESSION['wishlist'])) {
            $_SESSION['wishlist'] = [];
        }
        
        if (!in_array($product_id, $_SESSION['wishlist'])) {
            $_SESSION['wishlist'][] = $product_id;
            $_SESSION['success_message'] = 'Producto agregado a la lista de deseos';
        } else {
            $_SESSION['info_message'] = 'El producto ya está en tu lista de deseos';
        }
        
        // Redirigir de vuelta a la página anterior
        $referer = $_SERVER['HTTP_REFERER'] ?? BASE_URL;
        header('Location: ' . $referer);
        exit();
    }
    
    /**
     * Remover producto de wishlist
     */
    public function remove($product_id) {
        if (isset($_SESSION['wishlist'])) {
            $key = array_search($product_id, $_SESSION['wishlist']);
            if ($key !== false) {
                unset($_SESSION['wishlist'][$key]);
                $_SESSION['success_message'] = 'Producto removido de la lista de deseos';
            }
        }
        
        // Redirigir de vuelta a la página anterior
        $referer = $_SERVER['HTTP_REFERER'] ?? BASE_URL . 'user/wishlist';
        header('Location: ' . $referer);
        exit();
    }
    
    /**
     * Perfil de usuario
     */
    public function profile() {
        $data = [
            'title' => 'Mi Perfil - MultiShop',
            'current_page' => 'profile'
        ];
        
        $this->render('user/profile', $data);
    }
}