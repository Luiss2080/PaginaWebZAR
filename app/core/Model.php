<?php
/**
 * Modelo Base
 * Clase padre para todos los modelos
 */

class Model {
    
    protected $db;
    
    public function __construct() {
        $this->db = $this->getDatabase();
    }
    
    /**
     * Obtener conexión a la base de datos
     */
    protected function getDatabase() {
        try {
            $config = require CONFIG_PATH . 'database.php';
            
            $dsn = "mysql:host={$config['host']};dbname={$config['database']};charset={$config['charset']}";
            $pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);
            
            return $pdo;
        } catch (PDOException $e) {
            die('Error de conexión: ' . $e->getMessage());
        }
    }
    
    /**
     * Ejecutar consulta SELECT
     */
    public function select($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    
    /**
     * Ejecutar consulta SELECT y obtener un solo resultado
     */
    public function selectOne($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }
    
    /**
     * Ejecutar consulta INSERT, UPDATE o DELETE
     */
    public function execute($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        return $stmt->execute($params);
    }
    
    /**
     * Obtener el último ID insertado
     */
    public function lastInsertId() {
        return $this->db->lastInsertId();
    }
    
    /**
     * Iniciar transacción
     */
    public function beginTransaction() {
        return $this->db->beginTransaction();
    }
    
    /**
     * Confirmar transacción
     */
    public function commit() {
        return $this->db->commit();
    }
    
    /**
     * Revertir transacción
     */
    public function rollback() {
        return $this->db->rollback();
    }
}