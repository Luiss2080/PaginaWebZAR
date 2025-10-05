<?php
/**
 * Punto de entrada principal de la aplicación
 * MultiShop - E-commerce MVC Framework
 */

// Manejar archivos estáticos para servidor de desarrollo PHP
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$publicPath = __DIR__ . '/public' . $requestUri;

// Si el archivo existe en public/, servirlo directamente
if (file_exists($publicPath) && is_file($publicPath)) {
    return false; // Dejar que PHP sirva el archivo
}

// Definir constantes de la aplicación
define('ROOT_PATH', __DIR__ . '/');
define('APP_PATH', ROOT_PATH . 'app/');
define('PUBLIC_PATH', ROOT_PATH . 'public/');
define('CONFIG_PATH', ROOT_PATH . 'config/');

// Configurar el autoloader
require_once APP_PATH . 'core/App.php';

// Iniciar la aplicación
$app = new App();
$app->run();