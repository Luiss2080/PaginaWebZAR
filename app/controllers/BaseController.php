<?php
/**
 * Controlador base del que heredan todos los controladores
 */

class BaseController {
    
    /**
     * Renderizar una vista
     */
    protected function render($view, $data = []) {
        // Extraer variables para la vista
        extract($data);
        
        // Capturar el contenido de la vista
        ob_start();
        include APP_PATH . 'views/' . $view . '.php';
        $content = ob_get_clean();
        
        // Incluir el layout principal
        include APP_PATH . 'views/plantillas/principal.php';
    }
    
    /**
     * Renderizar vista sin layout (para AJAX)
     */
    protected function renderPartial($view, $data = []) {
        // Extraer variables para la vista
        extract($data);
        
        // Incluir solo la vista
        include APP_PATH . 'views/' . $view . '.php';
    }
    
    /**
     * Redirigir a otra página
     */
    protected function redirect($url, $code = 302) {
        header('Location: ' . BASE_URL . $url, true, $code);
        exit();
    }
    
    /**
     * Obtener parámetro GET de forma segura
     */
    protected function getGet($key, $default = null) {
        return $_GET[$key] ?? $default;
    }
    
    /**
     * Obtener parámetro POST de forma segura
     */
    protected function getPost($key, $default = null) {
        return $_POST[$key] ?? $default;
    }
    
    /**
     * Validar si la petición es AJAX
     */
    protected function isAjax() {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }
    
    /**
     * Responder con JSON
     */
    protected function json($data) {
        header('Content-Type: application/json');
        echo json_encode($data);
        exit();
    }
    
    /**
     * Obtener valor de sesión
     */
    protected function getSession($key, $default = null) {
        return $_SESSION[$key] ?? $default;
    }
    
    /**
     * Establecer valor de sesión
     */
    protected function setSession($key, $value) {
        $_SESSION[$key] = $value;
    }
}