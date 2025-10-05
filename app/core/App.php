<?php
/**
 * Clase principal de la aplicación
 * Maneja el enrutamiento y la carga de controladores
 */

class App {
    
    protected $controller = 'HomeController';
    protected $method = 'index';
    protected $params = [];
    
    public function __construct() {
        // Autoloader simple
        spl_autoload_register(function ($className) {
            $this->autoload($className);
        });
        
        // Cargar configuraciones
        $this->loadConfig();
    }
    
    public function run() {
        // Iniciar sesión
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $url = $this->parseUrl();
        
        // Manejar rutas especiales
        if (empty($url[0])) {
            $this->controller = 'HomeController';
        } elseif ($url[0] === 'products') {
            $this->controller = 'ProductController';
        } elseif ($url[0] === 'cart') {
            $this->controller = 'CartController';
        } elseif ($url[0] === 'checkout') {
            $this->controller = 'CheckoutController';
        } elseif ($url[0] === 'pages') {
            $this->controller = 'PagesController';
        } elseif ($url[0] === 'user') {
            $this->controller = 'UserController';
        } else {
            // Verificar si el controlador existe
            if (file_exists(APP_PATH . 'controllers/' . ucfirst($url[0]) . 'Controller.php')) {
                $this->controller = ucfirst($url[0]) . 'Controller';
            }
        }
        
        // Cargar el controlador
        require_once APP_PATH . 'controllers/' . $this->controller . '.php';
        $controllerInstance = new $this->controller;
        
        // Verificar si el método existe
        if (isset($url[1]) && method_exists($controllerInstance, $url[1])) {
            $this->method = $url[1];
            unset($url[1]);
        }
        
        // Limpiar URL
        if (isset($url[0])) {
            unset($url[0]);
        }
        
        // Obtener parámetros
        $this->params = $url ? array_values($url) : [];
        
        // Llamar al método del controlador con los parámetros
        call_user_func_array([$controllerInstance, $this->method], $this->params);
    }
    
    protected function parseUrl() {
        // Primero revisar si hay parámetro url en GET (para Apache con .htaccess)
        if (isset($_GET['url'])) {
            return explode('/', filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL));
        }
        
        // Para servidor de desarrollo PHP, parsear REQUEST_URI
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $uri = ltrim($uri, '/');
        
        if (empty($uri)) {
            return [];
        }
        
        return explode('/', filter_var(rtrim($uri, '/'), FILTER_SANITIZE_URL));
    }
    
    protected function autoload($className) {
        $directories = [
            APP_PATH . 'core/',
            APP_PATH . 'controllers/',
            APP_PATH . 'models/',
            APP_PATH . 'helpers/',
        ];
        
        foreach ($directories as $directory) {
            $file = $directory . $className . '.php';
            if (file_exists($file)) {
                require_once $file;
                return;
            }
        }
    }
    
    protected function loadConfig() {
        // Cargar archivo de configuración principal
        if (file_exists(CONFIG_PATH . 'app.php')) {
            require_once CONFIG_PATH . 'app.php';
        }
    }
}