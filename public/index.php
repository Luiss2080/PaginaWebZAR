<?php
/**
 * Front Controller - Maneja todas las peticiones web
 */

// Definir constantes de la aplicación
define('ROOT_PATH', dirname(__DIR__) . '/');
define('APP_PATH', ROOT_PATH . 'app/');
define('PUBLIC_PATH', ROOT_PATH . 'public/');
define('CONFIG_PATH', ROOT_PATH . 'config/');

// Configurar el autoloader
require_once APP_PATH . 'core/App.php';

// Iniciar la aplicación
$app = new App();
$app->run();