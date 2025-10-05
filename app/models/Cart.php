<?php
/**
 * Modelo del Carrito de Compras
 */

require_once APP_PATH . 'models/Model.php';

class Cart extends Model {
    
    protected $table = 'cart_items';
    
    /**
     * Obtener items del carrito por usuario
     */
    public function getCartByUser($userId) {
        $sql = "SELECT c.*, p.name, p.slug, p.price, p.image
                FROM {$this->table} c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.user_id = ? 
                ORDER BY c.created_at DESC";
        return $this->select($sql, [$userId]);
    }
    
    /**
     * Obtener items del carrito por sesión
     */
    public function getCartBySession($sessionId) {
        $sql = "SELECT c.*, p.name, p.slug, p.price, p.image
                FROM {$this->table} c 
                JOIN products p ON c.product_id = p.id 
                WHERE c.session_id = ? 
                ORDER BY c.created_at DESC";
        return $this->select($sql, [$sessionId]);
    }
    
    /**
     * Obtener todos los items del carrito (método genérico)
     */
    public function getCartItems($userId = null) {
        if ($userId) {
            return $this->getCartByUser($userId);
        } else {
            $sessionId = session_id();
            return $this->getCartBySession($sessionId);
        }
    }
    
    /**
     * Agregar producto al carrito
     */
    public function addToCart($userId, $sessionId, $productId, $quantity, $price) {
        // Verificar si el producto ya está en el carrito
        $existing = $this->getCartItem($userId, $sessionId, $productId);
        
        if ($existing) {
            // Actualizar cantidad
            $newQuantity = $existing->quantity + $quantity;
            return $this->updateQuantity($existing->id, $newQuantity);
        } else {
            // Insertar nuevo item
            $sql = "INSERT INTO {$this->table} (user_id, session_id, product_id, quantity, price) 
                    VALUES (?, ?, ?, ?, ?)";
            return $this->execute($sql, [$userId, $sessionId, $productId, $quantity, $price]);
        }
    }
    
    /**
     * Obtener un item específico del carrito
     */
    public function getCartItem($userId, $sessionId, $productId) {
        if ($userId) {
            $sql = "SELECT * FROM {$this->table} WHERE user_id = ? AND product_id = ?";
            return $this->selectOne($sql, [$userId, $productId]);
        } else {
            $sql = "SELECT * FROM {$this->table} WHERE session_id = ? AND product_id = ?";
            return $this->selectOne($sql, [$sessionId, $productId]);
        }
    }
    
    /**
     * Actualizar cantidad de un item
     */
    public function updateQuantity($cartItemId, $quantity) {
        if ($quantity <= 0) {
            return $this->removeItem($cartItemId);
        }
        
        $sql = "UPDATE {$this->table} SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?";
        return $this->execute($sql, [$quantity, $cartItemId]);
    }
    
    /**
     * Actualizar cantidad por producto
     */
    public function updateQuantityByProduct($userId, $sessionId, $productId, $quantity) {
        if ($quantity <= 0) {
            return $this->removeByProduct($userId, $sessionId, $productId);
        }
        
        if ($userId) {
            $sql = "UPDATE {$this->table} SET quantity = ?, updated_at = CURRENT_TIMESTAMP 
                    WHERE user_id = ? AND product_id = ?";
            return $this->execute($sql, [$quantity, $userId, $productId]);
        } else {
            $sql = "UPDATE {$this->table} SET quantity = ?, updated_at = CURRENT_TIMESTAMP 
                    WHERE session_id = ? AND product_id = ?";
            return $this->execute($sql, [$quantity, $sessionId, $productId]);
        }
    }
    
    /**
     * Eliminar item del carrito
     */
    public function removeItem($cartItemId) {
        $sql = "DELETE FROM {$this->table} WHERE id = ?";
        return $this->execute($sql, [$cartItemId]);
    }
    
    /**
     * Eliminar producto del carrito
     */
    public function removeByProduct($userId, $sessionId, $productId) {
        if ($userId) {
            $sql = "DELETE FROM {$this->table} WHERE user_id = ? AND product_id = ?";
            return $this->execute($sql, [$userId, $productId]);
        } else {
            $sql = "DELETE FROM {$this->table} WHERE session_id = ? AND product_id = ?";
            return $this->execute($sql, [$sessionId, $productId]);
        }
    }
    
    /**
     * Limpiar carrito
     */
    public function clearCart($userId, $sessionId) {
        if ($userId) {
            $sql = "DELETE FROM {$this->table} WHERE user_id = ?";
            return $this->execute($sql, [$userId]);
        } else {
            $sql = "DELETE FROM {$this->table} WHERE session_id = ?";
            return $this->execute($sql, [$sessionId]);
        }
    }
    
    /**
     * Contar items en el carrito
     */
    public function getCartCount($userId, $sessionId) {
        if ($userId) {
            $sql = "SELECT SUM(quantity) as total FROM {$this->table} WHERE user_id = ?";
            $result = $this->selectOne($sql, [$userId]);
        } else {
            $sql = "SELECT SUM(quantity) as total FROM {$this->table} WHERE session_id = ?";
            $result = $this->selectOne($sql, [$sessionId]);
        }
        
        return $result ? (int)$result->total : 0;
    }
    
    /**
     * Migrar carrito de sesión a usuario
     */
    public function migrateSessionToUser($sessionId, $userId) {
        // Primero obtener items de la sesión
        $sessionItems = $this->getCartBySession($sessionId);
        
        foreach ($sessionItems as $item) {
            // Verificar si el usuario ya tiene este producto
            $existing = $this->getCartItem($userId, null, $item->product_id);
            
            if ($existing) {
                // Sumar las cantidades
                $newQuantity = $existing->quantity + $item->quantity;
                $this->updateQuantity($existing->id, $newQuantity);
            } else {
                // Agregar nuevo item al usuario
                $this->addToCart($userId, null, $item->product_id, $item->quantity, $item->price);
            }
        }
        
        // Limpiar carrito de sesión
        $this->clearCart(null, $sessionId);
    }
    
    /**
     * Calcular totales del carrito
     */
    public function calculateTotals($cartItems) {
        $subtotal = 0;
        $itemCount = 0;
        
        foreach ($cartItems as $item) {
            $subtotal += $item->price * $item->quantity;
            $itemCount += $item->quantity;
        }
        
        $shipping = $subtotal > 1000 ? 0 : 150; // Envío gratis para compras >$1000
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
}