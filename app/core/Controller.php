<?php
/**
 * Controlador Base
 * Clase padre para todos los controladores
 */

class Controller {
    
    /**
     * Cargar un modelo
     */
    public function model($model) {
        require_once APP_PATH . 'models/' . $model . '.php';
        return new $model();
    }
    
    /**
     * Cargar una vista
     */
    public function view($view, $data = []) {
        extract($data);
        require_once APP_PATH . 'views/' . $view . '.php';
    }
    
    /**
     * Renderizar vista con layout
     */
    public function render($view, $data = [], $layout = 'main') {
        // Extraer datos para las vistas
        extract($data);
        
        // Capturar el contenido de la vista
        ob_start();
        require_once APP_PATH . 'views/' . $view . '.php';
        $content = ob_get_clean();
        
        // Renderizar con layout
        require_once APP_PATH . 'views/layouts/' . $layout . '.php';
    }
    
    /**
     * Redireccionar
     */
    public function redirect($url) {
        header('Location: ' . BASE_URL . $url);
        exit();
    }
    
    /**
     * Respuesta JSON
     */
    public function json($data, $status = 200) {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
    
    /**
     * Verificar si es petición POST
     */
    public function isPost() {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }
    
    /**
     * Verificar si es petición GET
     */
    public function isGet() {
        return $_SERVER['REQUEST_METHOD'] === 'GET';
    }
    
    /**
     * Obtener datos POST
     */
    public function post($key = null, $default = null) {
        if ($key === null) {
            return $_POST;
        }
        return $_POST[$key] ?? $default;
    }
    
    /**
     * Obtener datos GET
     */
    public function get($key = null, $default = null) {
        if ($key === null) {
            return $_GET;
        }
        return $_GET[$key] ?? $default;
    }
}