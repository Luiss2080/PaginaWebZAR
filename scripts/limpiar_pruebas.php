<?php
/**
 * Elimina los pedidos creados por las pruebas de integración (Spec 005).
 * Uso: php scripts/limpiar_pruebas.php
 */

$config = require __DIR__ . '/../config/database.php';
$dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $config['host'], $config['database'], $config['charset']);
$pdo = new PDO($dsn, $config['username'], $config['password'], $config['options']);

$marca = '%PRUEBA-API%';

$items = $pdo->prepare(
    'DELETE oi FROM order_items oi
     JOIN orders o ON o.id = oi.order_id
     WHERE o.billing_address LIKE ?'
);
$items->execute([$marca]);

$pedidos = $pdo->prepare('DELETE FROM orders WHERE billing_address LIKE ?');
$pedidos->execute([$marca]);

echo 'Pedidos de prueba eliminados: ' . $pedidos->rowCount() . PHP_EOL;
