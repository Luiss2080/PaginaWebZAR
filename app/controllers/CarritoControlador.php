<?php
/**
 * Controlador del Carrito de Compras
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Cart.php';
require_once APP_PATH . 'models/Product.php';
require_once APP_PATH . 'core/Database.php';

class CarritoControlador extends BaseController {
    
    private $cartModel;
    private $productModel;
    
    public function __construct() {
        $this->cartModel = new Cart();
        $this->productModel = new Product();
    }
    
    /**
     * Mostrar el carrito de compras
     */
    public function index() {
        $cartItems = $this->getCartItems();
        $cartSummary = $this->calculateCartSummary($cartItems);
        
        $data = [
            'title' => 'Carrito de Compras - MultiShop',
            'current_page' => 'cart',
            'cart_items' => $cartItems,
            'cart_summary' => $cartSummary
        ];
        
        $this->render('carrito/index', $data);
    }
    
    /**
     * Agregar producto al carrito
     */
    public function add($productId = null) {
        if (!$productId) {
            $productId = $this->getPost('product_id');
        }
        
        $quantity = (int)$this->getPost('quantity', 1);
        
        if (!$productId) {
            if ($this->isAjax()) {
                $this->json(['success' => false, 'message' => 'Producto no especificado']);
            }
            $this->redirect('products');
        }
        
        $product = $this->productModel->getById($productId);
        if (!$product) {
            if ($this->isAjax()) {
                $this->json(['success' => false, 'message' => 'Producto no encontrado']);
            }
            $this->redirect('products');
        }
        
        // Agregar al carrito (sesión por ahora, luego BD si hay usuario)
        $this->addToCart($product, $quantity);
        
        if ($this->isAjax()) {
            $cartCount = $this->getCartCount();
            $this->json([
                'success' => true, 
                'message' => 'Producto agregado al carrito',
                'cart_count' => $cartCount
            ]);
        }
        
        $this->redirect('cart');
    }
    
    /**
     * Actualizar cantidad en el carrito
     */
    public function update() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('cart');
        }
        
        $productId = $this->getPost('product_id');
        $quantity = (int)$this->getPost('quantity');
        
        if ($quantity <= 0) {
            $this->remove($productId);
            return;
        }
        
        $this->updateCartQuantity($productId, $quantity);
        
        if ($this->isAjax()) {
            $cartItems = $this->getCartItems();
            $cartSummary = $this->calculateCartSummary($cartItems);
            $this->json([
                'success' => true,
                'cart_summary' => $cartSummary
            ]);
        }
        
        $this->redirect('cart');
    }
    
    /**
     * Remover producto del carrito
     */
    public function remove($productId = null) {
        if (!$productId) {
            $productId = $this->getPost('product_id');
        }
        
        $this->removeFromCart($productId);
        
        if ($this->isAjax()) {
            $cartCount = $this->getCartCount();
            $this->json([
                'success' => true,
                'message' => 'Producto eliminado del carrito',
                'cart_count' => $cartCount
            ]);
        }
        
        $this->redirect('cart');
    }
    
    /**
     * Limpiar todo el carrito
     */
    public function clear() {
        $this->clearCart();
        
        if ($this->isAjax()) {
            $this->json(['success' => true, 'message' => 'Carrito vaciado']);
        }
        
        $this->redirect('cart');
    }
    
    // Métodos privados para manejo del carrito
    private function addToCart($product, $quantity) {
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
        
        $productId = $product->id;
        if (isset($_SESSION['cart'][$productId])) {
            $_SESSION['cart'][$productId]['quantity'] += $quantity;
        } else {
            $_SESSION['cart'][$productId] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'image' => $this->getProductImage($product->id),
                'quantity' => $quantity
            ];
        }
    }
    
    private function getCartItems() {
        return $_SESSION['cart'] ?? [];
    }
    
    private function getCartCount() {
        $count = 0;
        foreach ($this->getCartItems() as $item) {
            $count += $item['quantity'];
        }
        return $count;
    }
    
    private function updateCartQuantity($productId, $quantity) {
        if (isset($_SESSION['cart'][$productId])) {
            $_SESSION['cart'][$productId]['quantity'] = $quantity;
        }
    }
    
    private function removeFromCart($productId) {
        if (isset($_SESSION['cart'][$productId])) {
            unset($_SESSION['cart'][$productId]);
        }
    }
    
    private function clearCart() {
        $_SESSION['cart'] = [];
    }
    
    private function calculateCartSummary($cartItems) {
        $subtotal = 0;
        $itemCount = 0;
        
        foreach ($cartItems as $item) {
            $subtotal += $item['price'] * $item['quantity'];
            $itemCount += $item['quantity'];
        }
        
        $shipping = $subtotal > 1000 ? 0 : 150; // Envío gratis >$1000
        $tax = $subtotal * 0.16; // 16% IVA
        $total = $subtotal + $shipping + $tax;
        
        return [
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total,
            'item_count' => $itemCount
        ];
    }
    
    private function getProductImage($productId) {
        // Temporal: usar imagen por defecto basada en ID
        return 'product-' . (($productId - 1) % 8 + 1) . '.jpg';
    }
}
