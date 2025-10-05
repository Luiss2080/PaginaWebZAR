<?php
/**
 * Configuración principal de la aplicación
 */

// URL base de la aplicación
define('BASE_URL', 'http://localhost:8080/');

// Configuración de la aplicación
$config = [
    'app_name' => 'MultiShop',
    'app_version' => '1.0.0',
    'debug' => true,
    'timezone' => 'America/Mexico_City',
    'charset' => 'UTF-8',
];

// Configurar zona horaria
date_default_timezone_set($config['timezone']);

// Configurar reporte de errores según el modo debug
if ($config['debug']) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Iniciar sesión
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}