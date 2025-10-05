<?php
/**
 * Controlador Base
 * Clase padre para todos los controladores
 */

class Controller {
    
    /**
     * Renderizar una vista
     */
    protected function render($view, $data = []) {
        // Extraer las variables para que estén disponibles en la vista
        extract($data);
        
        // Incluir el header
        include APP_PATH . 'views/layouts/header.php';
        
        // Incluir el navbar
        include APP_PATH . 'views/layouts/navbar.php';
        
        // Incluir la vista específica
        $viewFile = APP_PATH . 'views/' . $view . '.php';
        if (file_exists($viewFile)) {
            include $viewFile;
        } else {
            throw new Exception("Vista no encontrada: $view");
        }
        
        // Incluir el footer
        include APP_PATH . 'views/layouts/footer.php';
    }
    
    /**
     * Renderizar solo una vista sin layouts
     */
    protected function renderView($view, $data = []) {
        extract($data);
        
        $viewFile = APP_PATH . 'views/' . $view . '.php';
        if (file_exists($viewFile)) {
            include $viewFile;
        } else {
            throw new Exception("Vista no encontrada: $view");
        }
    }
    
    /**
     * Redireccionar a una URL
     */
    protected function redirect($url) {
        header('Location: ' . BASE_URL . $url);
        exit;
    }
    
    /**
     * Obtener datos POST
     */
    protected function getPost($key = null, $default = null) {
        if ($key === null) {
            return $_POST;
        }
        return isset($_POST[$key]) ? $_POST[$key] : $default;
    }
    
    /**
     * Obtener datos GET
     */
    protected function getGet($key = null, $default = null) {
        if ($key === null) {
            return $_GET;
        }
        return isset($_GET[$key]) ? $_GET[$key] : $default;
    }
    
    /**
     * Verificar si la petición es POST
     */
    protected function isPost() {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }
    
    /**
     * Verificar si la petición es AJAX
     */
    protected function isAjax() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }
    
    /**
     * Responder con JSON
     */
    protected function jsonResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
}