<?php
/**
 * Controlador de Checkout
 */

require_once 'BaseController.php';
require_once APP_PATH . 'models/Cart.php';
require_once APP_PATH . 'models/Product.php';
require_once APP_PATH . 'core/Database.php';

class PagoControlador extends BaseController {
    
    private $cartModel;
    private $productModel;
    
    public function __construct() {
        $this->cartModel = new Cart();
        $this->productModel = new Product();
    }
    
    /**
     * Página de checkout
     */
    public function index() {
        // Verificar que hay productos en el carrito
        $cartItems = $this->cartModel->getCartItems();
        
        if (empty($cartItems)) {
            $_SESSION['error_message'] = 'Tu carrito está vacío';
            header('Location: ' . BASE_URL . 'cart');
            exit();
        }
        
        // Calcular totales
        $subtotal = 0;
        foreach ($cartItems as $item) {
            $subtotal += $item->price * $item->quantity;
        }
        
        $shipping = $subtotal >= 1000 ? 0 : 100; // Envío gratis en compras mayores a $1000
        $tax = $subtotal * 0.16; // 16% de IVA
        $total = $subtotal + $shipping + $tax;
        
        $data = [
            'title' => 'Checkout - MultiShop',
            'current_page' => 'checkout',
            'cart_items' => $cartItems,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total
        ];
        
        $this->render('pago/index', $data);
    }
    
    /**
     * Procesar orden de compra
     */
    public function processOrder() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            header('Location: ' . BASE_URL . 'checkout');
            exit();
        }
        
        // Validar datos del formulario
        $billingData = $this->validateBillingData($_POST);
        
        if (!$billingData) {
            $_SESSION['error_message'] = 'Por favor completa todos los campos requeridos';
            header('Location: ' . BASE_URL . 'checkout');
            exit();
        }
        
        // Verificar carrito
        $cartItems = $this->cartModel->getCartItems();
        if (empty($cartItems)) {
            $_SESSION['error_message'] = 'Tu carrito está vacío';
            header('Location: ' . BASE_URL . 'cart');
            exit();
        }
        
        // Calcular totales
        $subtotal = 0;
        foreach ($cartItems as $item) {
            $subtotal += $item->price * $item->quantity;
        }
        
        $shipping = $subtotal >= 1000 ? 0 : 100;
        $tax = $subtotal * 0.16;
        $total = $subtotal + $shipping + $tax;
        
        // Crear orden (aquí integrarías con el sistema de pagos)
        $orderData = [
            'customer_data' => $billingData,
            'items' => $cartItems,
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total,
            'payment_method' => $_POST['payment'] ?? '',
            'order_date' => date('Y-m-d H:i:s')
        ];
        
        // Simular procesamiento de orden
        $orderId = $this->createOrder($orderData);
        
        if ($orderId) {
            // Limpiar carrito
            $userId = $_SESSION['user_id'] ?? null;
            $sessionId = session_id();
            $this->cartModel->clearCart($userId, $sessionId);
            
            // Redirigir a página de éxito
            $_SESSION['success_message'] = 'Orden procesada exitosamente. ID: ' . $orderId;
            header('Location: ' . BASE_URL . 'checkout/success/' . $orderId);
            exit();
        } else {
            $_SESSION['error_message'] = 'Error al procesar la orden. Intenta nuevamente.';
            header('Location: ' . BASE_URL . 'checkout');
            exit();
        }
    }
    
    /**
     * Página de éxito
     */
    public function success($orderId = null) {
        if (!$orderId) {
            header('Location: ' . BASE_URL);
            exit();
        }
        
        $data = [
            'title' => 'Orden Completada - MultiShop',
            'current_page' => 'checkout_success',
            'order_id' => $orderId
        ];
        
        $this->render('pago/success', $data);
    }
    
    /**
     * Validar datos de facturación
     */
    private function validateBillingData($data) {
        $required = ['first_name', 'last_name', 'email', 'mobile', 'address1', 'city', 'state', 'zip'];
        
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return false;
            }
        }
        
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        
        return [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'mobile' => $data['mobile'],
            'address1' => $data['address1'],
            'address2' => $data['address2'] ?? '',
            'city' => $data['city'],
            'state' => $data['state'],
            'zip' => $data['zip'],
            'country' => $data['country'] ?? 'México'
        ];
    }
    
    /**
     * Crear orden (simulado)
     */
    private function createOrder($orderData) {
        // Aquí integrarías con tu base de datos para guardar la orden
        // Por ahora solo generamos un ID simulado
        return 'ORD-' . date('Ymd') . '-' . rand(1000, 9999);
    }
}