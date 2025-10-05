<?php
/**
 * Modelo de Productos
 */

require_once APP_PATH . 'models/Model.php';

class Product extends Model {
    
    protected $table = 'products';
    
    /**
     * Obtener todos los productos
     */
    public function getAll($limit = null) {
        $sql = "SELECT * FROM {$this->table} WHERE status = 'active'";
        if ($limit) {
            $sql .= " LIMIT $limit";
        }
        return $this->select($sql);
    }
    
    /**
     * Obtener productos destacados
     */
    public function getFeatured($limit = 8) {
        $sql = "SELECT * FROM {$this->table} WHERE status = 'active' AND featured = 1 LIMIT $limit";
        return $this->select($sql);
    }
    
    /**
     * Obtener productos recientes
     */
    public function getRecent($limit = 8) {
        $sql = "SELECT * FROM {$this->table} WHERE status = 'active' ORDER BY created_at DESC LIMIT $limit";
        return $this->select($sql);
    }
    
    /**
     * Obtener producto por ID
     */
    public function getById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? AND status = 'active'";
        return $this->find($sql, [$id]);
    }
    
    /**
     * Obtener productos por categoría
     */
    public function getByCategory($categoryId, $limit = null) {
        $sql = "SELECT * FROM {$this->table} WHERE category_id = ? AND status = 'active'";
        $params = [$categoryId];
        
        if ($limit) {
            $sql .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return $this->select($sql, $params);
    }
    
    /**
     * Buscar productos
     */
    public function search($query, $limit = null) {
        $sql = "SELECT * FROM {$this->table} WHERE (name LIKE ? OR description LIKE ?) AND status = 'active'";
        $params = ["%$query%", "%$query%"];
        
        if ($limit) {
            $sql .= " LIMIT ?";
            $params[] = $limit;
        }
        
        return $this->select($sql, $params);
    }
    
    /**
     * Obtener productos con filtros
     */
    public function getWithFilters($filters = [], $limit = null, $offset = 0) {
        $sql = "SELECT * FROM {$this->table} WHERE status = 'active'";
        $params = [];
        
        if (isset($filters['category_id'])) {
            $sql .= " AND category_id = ?";
            $params[] = $filters['category_id'];
        }
        
        if (isset($filters['min_price'])) {
            $sql .= " AND price >= ?";
            $params[] = $filters['min_price'];
        }
        
        if (isset($filters['max_price'])) {
            $sql .= " AND price <= ?";
            $params[] = $filters['max_price'];
        }
        
        if (isset($filters['brand_id'])) {
            $sql .= " AND brand_id = ?";
            $params[] = $filters['brand_id'];
        }
        
        // Ordenamiento
        $orderBy = $filters['order_by'] ?? 'created_at';
        $orderDir = $filters['order_dir'] ?? 'DESC';
        $sql .= " ORDER BY $orderBy $orderDir";
        
        if ($limit) {
            $sql .= " LIMIT $limit OFFSET $offset";
        }
        
        return $this->select($sql, $params);
    }
    
    /**
     * Contar productos con filtros
     */
    public function countWithFilters($filters = []) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE status = 'active'";
        $params = [];
        
        if (isset($filters['category_id'])) {
            $sql .= " AND category_id = ?";
            $params[] = $filters['category_id'];
        }
        
        if (isset($filters['min_price'])) {
            $sql .= " AND price >= ?";
            $params[] = $filters['min_price'];
        }
        
        if (isset($filters['max_price'])) {
            $sql .= " AND price <= ?";
            $params[] = $filters['max_price'];
        }
        
        if (isset($filters['brand_id'])) {
            $sql .= " AND brand_id = ?";
            $params[] = $filters['brand_id'];
        }
        
        $result = $this->find($sql, $params);
        return $result['total'] ?? 0;
    }
    
    /**
     * Obtener productos relacionados por categoría
     */
    public function getRelatedProducts($productId, $categoryId, $limit = 4) {
        $sql = "SELECT * FROM {$this->table} 
                WHERE status = 'active' 
                AND category_id = ? 
                AND id != ? 
                ORDER BY RAND() 
                LIMIT ?";
        
        return $this->select($sql, [$categoryId, $productId, $limit]);
    }
    

    

}