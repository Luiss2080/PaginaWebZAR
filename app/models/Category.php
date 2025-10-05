<?php
/**
 * Modelo de Categorías
 */

require_once APP_PATH . 'models/Model.php';

class Category extends Model {
    
    protected $table = 'categories';
    
    /**
     * Obtener todas las categorías activas
     */
    public function getAll() {
        $sql = "SELECT c.*, COUNT(p.id) as products_count 
                FROM {$this->table} c 
                LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
                WHERE c.status = 'active' 
                GROUP BY c.id 
                ORDER BY c.sort_order, c.name";
        return $this->select($sql);
    }
    
    /**
     * Obtener categoría por ID
     */
    public function getById($id) {
        $sql = "SELECT * FROM {$this->table} WHERE id = ? AND status = 'active'";
        return $this->find($sql, [$id]);
    }
    
    /**
     * Obtener categorías principales (sin padre)
     */
    public function getMainCategories() {
        $sql = "SELECT * FROM {$this->table} WHERE parent_id IS NULL AND status = 'active' ORDER BY sort_order, name";
        return $this->select($sql);
    }
    
    /**
     * Obtener subcategorías de una categoría
     */
    public function getSubcategories($parentId) {
        $sql = "SELECT * FROM {$this->table} WHERE parent_id = ? AND status = 'active' ORDER BY sort_order, name";
        return $this->select($sql, [$parentId]);
    }
    
    /**
     * Obtener categorías con contador de productos
     */
    public function getWithProductCount() {
        $sql = "SELECT c.*, COUNT(p.id) as products_count 
                FROM {$this->table} c 
                LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
                WHERE c.status = 'active' 
                GROUP BY c.id 
                ORDER BY c.sort_order, c.name";
        return $this->select($sql);
    }
    
    /**
     * Buscar categorías
     */
    public function search($query) {
        $sql = "SELECT * FROM {$this->table} WHERE name LIKE ? AND status = 'active' ORDER BY name";
        return $this->select($sql, ["%$query%"]);
    }
}