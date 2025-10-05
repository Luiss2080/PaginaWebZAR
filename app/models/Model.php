<?php
/**
 * Modelo base del que heredan todos los modelos
 */

class Model {
    
    protected $db;
    protected $table;
    
    public function __construct() {
        $this->db = Database::connect();
    }
    
    /**
     * Ejecutar una consulta SELECT
     */
    protected function select($sql, $params = []) {
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch(PDOException $e) {
            error_log("Error en SELECT: " . $e->getMessage());
            return [];
        }
    }
    
    /**
     * Ejecutar una consulta SELECT que retorna un solo registro
     */
    protected function find($sql, $params = []) {
        try {
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetch();
        } catch(PDOException $e) {
            error_log("Error en FIND: " . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Ejecutar una consulta INSERT, UPDATE o DELETE
     */
    protected function execute($sql, $params = []) {
        try {
            $stmt = $this->db->prepare($sql);
            return $stmt->execute($params);
        } catch(PDOException $e) {
            error_log("Error en EXECUTE: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Obtener el último ID insertado
     */
    protected function lastInsertId() {
        return $this->db->lastInsertId();
    }
    
    /**
     * Iniciar transacción
     */
    protected function beginTransaction() {
        return $this->db->beginTransaction();
    }
    
    /**
     * Confirmar transacción
     */
    protected function commit() {
        return $this->db->commit();
    }
    
    /**
     * Revertir transacción
     */
    protected function rollback() {
        return $this->db->rollBack();
    }
}