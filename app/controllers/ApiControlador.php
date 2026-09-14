<?php
/**
 * API JSON para la SPA.
 *
 * Expone en /api/... los datos de la app legada en el formato que consume
 * frontend/src/servicios/api.js.
 *
 * Consulta directamente el esquema real de multishop_db
 * (products.is_active / is_featured / is_new / sale_price / image, categories,
 * brands, product_images, product_variants, cart_items y wishlist_items).
 *
 * Rutas resueltas por el fallback dinámico de app/core/App.php. El verbo y la
 * acción se deciden dentro de cada método:
 *   GET  /api/productos              productos()
 *   GET  /api/productos/{id}         productos($id)
 *   GET  /api/categorias             categorias()
 *   GET  /api/marcas                 marcas()
 *   GET  /api/buscar?q=...           buscar()
 *   GET  /api/carrito                carrito()
 *   POST /api/carrito/{accion}       carrito($accion)
 *   GET  /api/favoritos              favoritos()
 *   POST /api/favoritos/alternar     favoritos('alternar')
 *   GET  /api/cuenta                 cuenta()
 *   POST /api/cuenta/{accion}        cuenta($accion)
 */

require_once 'BaseController.php';
require_once APP_PATH . 'core/Database.php';

class ApiControlador extends BaseController {

    private $cuerpoCache = null;

    // -----------------------------------------------------------------------
    // Catálogo
    // -----------------------------------------------------------------------

    public function productos($id = null) {
        $categorias = $this->mapa('categories');
        $marcas = $this->mapa('brands');
        $imagenes = $this->imagenesPorProducto();
        $variantes = $this->variantesPorProducto();

        $campos = 'id, name, slug, description, price, sale_price, category_id,
                   brand_id, image, is_featured, is_new';

        if ($id !== null) {
            $fila = $this->uno(
                "SELECT $campos FROM products WHERE id = ? AND is_active = 1",
                [$id]
            );
            $this->json(
                $fila ? $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes) : null
            );
        }

        $filas = $this->consultar("SELECT $campos FROM products WHERE is_active = 1 ORDER BY created_at DESC");
        $datos = array_map(
            fn($fila) => $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes),
            $filas
        );
        $this->json($datos);
    }

    public function categorias() {
        $filas = $this->consultar(
            'SELECT id, name, slug, description FROM categories WHERE is_active = 1 ORDER BY name'
        );
        $datos = array_map(fn($fila) => [
            'id' => (int)$fila['id'],
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
            'descripcion' => $fila['description'] ?? '',
            'imagen' => '/img/cat-' . ((((int)$fila['id'] - 1) % 4) + 1) . '.jpg',
        ], $filas);
        $this->json($datos);
    }

    public function marcas() {
        $filas = $this->consultar('SELECT id, name, slug FROM brands ORDER BY name');
        $datos = array_map(fn($fila) => [
            'id' => (int)$fila['id'],
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
        ], $filas);
        $this->json($datos);
    }

    public function buscar() {
        $termino = trim($_GET['q'] ?? '');
        if ($termino === '') {
            $this->json([]);
        }

        $categorias = $this->mapa('categories');
        $marcas = $this->mapa('brands');
        $imagenes = $this->imagenesPorProducto();
        $variantes = $this->variantesPorProducto();

        $filas = $this->consultar(
            'SELECT id, name, slug, description, price, sale_price, category_id, brand_id,
                    image, is_featured, is_new
             FROM products
             WHERE is_active = 1 AND (name LIKE ? OR description LIKE ?)
             ORDER BY name LIMIT 8',
            ['%' . $termino . '%', '%' . $termino . '%']
        );
        $datos = array_map(
            fn($fila) => $this->formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes),
            $filas
        );
        $this->json($datos);
    }

    // -----------------------------------------------------------------------
    // Carrito
    // -----------------------------------------------------------------------

    public function carrito($accion = null) {
        $metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($accion === null) {
            if ($metodo !== 'GET') {
                $this->error('Método no permitido', 405);
            }
            $this->json($this->lineasCarrito());
        }

        if ($metodo !== 'POST') {
            $this->error('Método no permitido', 405);
        }

        switch ($accion) {
            case 'agregar': {
                $productoId = (int)$this->entrada('productoId', 0);
                $cantidad = max(1, min(99, (int)$this->entrada('cantidad', 1)));
                $talla = $this->texto($this->entrada('talla', 'Única'));
                $color = $this->texto($this->entrada('color', 'Única'));
                if (!$this->productoActivo($productoId)) {
                    $this->error('Producto inexistente', 404);
                }
                $this->ejecutar(
                    'INSERT INTO cart_items (session_id, user_id, product_id, quantity, size, color_name)
                     VALUES (?, ?, ?, ?, ?, ?)
                     ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',
                    [$this->sesionId(), $this->usuarioId(), $productoId, $cantidad, $talla, $color]
                );
                break;
            }
            case 'cantidad': {
                $id = (int)$this->entrada('id', 0);
                $cantidad = (int)$this->entrada('cantidad', 1);
                if ($cantidad <= 0) {
                    $this->ejecutar(
                        'DELETE FROM cart_items WHERE id = ? AND session_id = ?',
                        [$id, $this->sesionId()]
                    );
                } else {
                    $this->ejecutar(
                        'UPDATE cart_items SET quantity = ? WHERE id = ? AND session_id = ?',
                        [min($cantidad, 99), $id, $this->sesionId()]
                    );
                }
                break;
            }
            case 'quitar': {
                $id = (int)$this->entrada('id', 0);
                $this->ejecutar(
                    'DELETE FROM cart_items WHERE id = ? AND session_id = ?',
                    [$id, $this->sesionId()]
                );
                break;
            }
            case 'vaciar':
                $this->ejecutar('DELETE FROM cart_items WHERE session_id = ?', [$this->sesionId()]);
                break;
            default:
                $this->error('Acción no válida', 404);
        }

        $this->json($this->lineasCarrito());
    }

    // -----------------------------------------------------------------------
    // Favoritos
    // -----------------------------------------------------------------------

    public function favoritos($accion = null) {
        $metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($accion === null) {
            if ($metodo !== 'GET') {
                $this->error('Método no permitido', 405);
            }
            $this->json($this->idsFavoritos());
        }

        if ($metodo !== 'POST') {
            $this->error('Método no permitido', 405);
        }

        if ($accion === 'alternar') {
            $productoId = (int)$this->entrada('productoId', 0);
            if (!$this->productoActivo($productoId)) {
                $this->error('Producto inexistente', 404);
            }
            $existente = $this->uno(
                'SELECT id FROM wishlist_items WHERE session_id = ? AND product_id = ?',
                [$this->sesionId(), $productoId]
            );
            if ($existente) {
                $this->ejecutar('DELETE FROM wishlist_items WHERE id = ?', [$existente['id']]);
            } else {
                $this->ejecutar(
                    'INSERT INTO wishlist_items (session_id, user_id, product_id) VALUES (?, ?, ?)',
                    [$this->sesionId(), $this->usuarioId(), $productoId]
                );
            }
            $this->json($this->idsFavoritos());
        }

        $this->error('Acción no válida', 404);
    }

    // -----------------------------------------------------------------------
    // Cuenta
    // -----------------------------------------------------------------------

    public function cuenta($accion = null) {
        $metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($accion === null) {
            if ($metodo !== 'GET') {
                $this->error('Método no permitido', 405);
            }
            $this->json(['usuario' => $_SESSION['usuario'] ?? null]);
        }

        if ($metodo !== 'POST') {
            $this->error('Método no permitido', 405);
        }

        switch ($accion) {
            case 'login': {
                $email = strtolower(trim((string)$this->entrada('email', '')));
                $password = (string)$this->entrada('password', '');
                if ($email === '' || $password === '') {
                    $this->error('Introduce correo y contraseña');
                }
                $usuario = $this->uno(
                    'SELECT id, email, password, first_name, last_name
                     FROM users WHERE email = ? AND is_active = 1',
                    [$email]
                );
                if (!$usuario || !password_verify($password, $usuario['password'])) {
                    $this->error('Credenciales inválidas', 401);
                }
                $this->abrirSesion($usuario);
                $this->json(['usuario' => $_SESSION['usuario']]);
                break;
            }
            case 'registro': {
                $nombre = $this->texto($this->entrada('nombre', ''));
                $email = strtolower(trim((string)$this->entrada('email', '')));
                $password = (string)$this->entrada('password', '');
                if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $this->error('Revisa el nombre y el correo');
                }
                if (strlen($password) < 6) {
                    $this->error('La contraseña debe tener al menos 6 caracteres');
                }
                if ($this->uno('SELECT id FROM users WHERE email = ?', [$email])) {
                    $this->error('El correo ya está registrado', 409);
                }
                $this->ejecutar(
                    'INSERT INTO users (email, password, first_name, last_name, is_active)
                     VALUES (?, ?, ?, ?, 1)',
                    [$email, password_hash($password, PASSWORD_DEFAULT), $nombre, '']
                );
                $usuario = $this->uno(
                    'SELECT id, email, first_name, last_name FROM users WHERE email = ?',
                    [$email]
                );
                $this->abrirSesion($usuario);
                $this->json(['usuario' => $_SESSION['usuario']]);
                break;
            }
            case 'logout':
                unset($_SESSION['usuario_id'], $_SESSION['usuario']);
                $this->json(['usuario' => null]);
                break;
            default:
                $this->error('Acción no válida', 404);
        }
    }

    // -----------------------------------------------------------------------
    // Pedidos
    // -----------------------------------------------------------------------

    public function pedidos($accion = null) {
        $metodo = $_SERVER['REQUEST_METHOD'] ?? 'GET';

        if ($accion === null) {
            if ($metodo !== 'GET') {
                $this->error('Método no permitido', 405);
            }
            if ($this->usuarioId() === null) {
                $this->error('Inicia sesión para ver tus pedidos', 401);
            }
            $this->json($this->pedidosDelUsuario());
        }

        if ($metodo !== 'POST') {
            $this->error('Método no permitido', 405);
        }

        if ($accion === 'crear') {
            $this->crearPedido();
        }

        $this->error('Acción no válida', 404);
    }

    private function crearPedido() {
        $usuarioId = $this->usuarioId();
        if ($usuarioId === null) {
            $this->error('Inicia sesión para confirmar el pedido', 401);
        }

        $nombre = trim((string)$this->entrada('nombre', ''));
        $direccion = trim((string)$this->entrada('direccion', ''));
        $ciudad = trim((string)$this->entrada('ciudad', ''));
        $codigoPostal = trim((string)$this->entrada('codigoPostal', ''));
        $pais = trim((string)$this->entrada('pais', ''));
        if ($nombre === '' || $direccion === '' || $ciudad === '' || $codigoPostal === '' || $pais === '') {
            $this->error('Completa la dirección de envío');
        }

        $lineas = $this->lineasCarrito();
        if (count($lineas) === 0) {
            $this->error('El carrito está vacío');
        }

        $subtotal = 0.0;
        foreach ($lineas as $linea) {
            $subtotal += $linea['precio'] * $linea['cantidad'];
        }
        $envio = $subtotal >= 30 ? 0.0 : 3.95;
        $total = round($subtotal + $envio, 2);

        $direccionTexto = json_encode([
            'nombre' => $nombre,
            'direccion' => $direccion,
            'ciudad' => $ciudad,
            'codigoPostal' => $codigoPostal,
            'pais' => $pais,
            'telefono' => trim((string)$this->entrada('telefono', '')),
        ], JSON_UNESCAPED_UNICODE);

        $numero = 'ZR-' . date('Ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 5));

        $db = Database::connect();
        $db->beginTransaction();
        try {
            $stmt = $db->prepare(
                'INSERT INTO orders (user_id, order_number, status, total_amount, shipping_amount,
                        tax_amount, discount_amount, billing_address, shipping_address,
                        payment_method, payment_status)
                 VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?, ?, ?)'
            );
            $stmt->execute([
                $usuarioId,
                $numero,
                'pending',
                $total,
                $envio,
                $direccionTexto,
                $direccionTexto,
                (string)$this->entrada('metodoPago', 'tarjeta'),
                'pending',
            ]);
            $orderId = (int)$db->lastInsertId();

            $insertarLinea = $db->prepare(
                'INSERT INTO order_items (order_id, product_id, quantity, price, total)
                 VALUES (?, ?, ?, ?, ?)'
            );
            foreach ($lineas as $linea) {
                $insertarLinea->execute([
                    $orderId,
                    $linea['productoId'],
                    $linea['cantidad'],
                    $linea['precio'],
                    round($linea['precio'] * $linea['cantidad'], 2),
                ]);
            }

            $borrar = $db->prepare('DELETE FROM cart_items WHERE session_id = ?');
            $borrar->execute([$this->sesionId()]);

            $db->commit();
        } catch (PDOException $error) {
            $db->rollBack();
            error_log('Error al crear el pedido: ' . $error->getMessage());
            $this->error('No se pudo crear el pedido', 500);
        }

        $this->json(['pedido' => ['numero' => $numero, 'total' => $total, 'estado' => 'pending']]);
    }

    private function pedidosDelUsuario() {
        $filas = $this->consultar(
            'SELECT id, order_number, status, total_amount, created_at
             FROM orders WHERE user_id = ? ORDER BY id DESC',
            [$this->usuarioId()]
        );

        $pedidos = [];
        foreach ($filas as $fila) {
            $items = $this->consultar(
                'SELECT oi.product_id, oi.quantity, oi.price, oi.total, p.name, p.image
                 FROM order_items oi
                 LEFT JOIN products p ON p.id = oi.product_id
                 WHERE oi.order_id = ? ORDER BY oi.id',
                [(int)$fila['id']]
            );
            $pedidos[] = [
                'numero' => $fila['order_number'],
                'estado' => $fila['status'],
                'total' => (float)$fila['total_amount'],
                'fecha' => $fila['created_at'],
                'items' => array_map(fn($item) => [
                    'nombre' => $item['name'] ?? 'Producto',
                    'imagen' => $this->imagenProducto((int)$item['product_id'], $item['image'] ?? ''),
                    'cantidad' => (int)$item['quantity'],
                    'precio' => (float)$item['price'],
                    'total' => (float)$item['total'],
                ], $items),
            ];
        }
        return $pedidos;
    }

    // -----------------------------------------------------------------------
    // Ayudantes
    // -----------------------------------------------------------------------

    private function lineasCarrito() {
        $filas = $this->consultar(
            'SELECT c.id, c.product_id, c.quantity, c.size, c.color_name,
                    p.name, p.price, p.sale_price, p.image
             FROM cart_items c
             JOIN products p ON p.id = c.product_id
             WHERE c.session_id = ?
             ORDER BY c.id',
            [$this->sesionId()]
        );

        $datos = [];
        foreach ($filas as $fila) {
            $precio = (float)$fila['price'];
            $oferta = $fila['sale_price'] !== null ? (float)$fila['sale_price'] : null;
            if ($oferta !== null && $oferta > 0 && $oferta < $precio) {
                $precio = $oferta;
            }
            $datos[] = [
                'idLinea' => (int)$fila['id'],
                'productoId' => (int)$fila['product_id'],
                'nombre' => $fila['name'],
                'precio' => $precio,
                'imagen' => $this->imagenProducto((int)$fila['product_id'], $fila['image']),
                'talla' => $fila['size'] ?? 'Única',
                'color' => $fila['color_name'] ?? 'Única',
                'cantidad' => (int)$fila['quantity'],
            ];
        }
        return $datos;
    }

    private function idsFavoritos() {
        $filas = $this->consultar(
            'SELECT product_id FROM wishlist_items WHERE session_id = ? ORDER BY id',
            [$this->sesionId()]
        );
        return array_map(fn($fila) => (int)$fila['product_id'], $filas);
    }

    private function formatearProducto($fila, $categorias, $marcas, $imagenes, $variantes) {
        $id = (int)$fila['id'];
        $precio = (float)$fila['price'];
        $oferta = $fila['sale_price'] !== null ? (float)$fila['sale_price'] : null;
        $tieneOferta = $oferta !== null && $oferta > 0 && $oferta < $precio;

        $imagenProducto = $imagenes[$id] ?? [$this->imagenProducto($id, $fila['image'])];
        $variante = $variantes[$id] ?? ['tallas' => [], 'colores' => []];

        return [
            'id' => $id,
            'nombre' => $fila['name'],
            'slug' => $fila['slug'],
            'descripcion' => $fila['description'] ?? '',
            'precio' => $tieneOferta ? $oferta : $precio,
            'precioAnterior' => $tieneOferta ? $precio : null,
            'categoria' => $categorias[(int)$fila['category_id']] ?? '',
            'marca' => $marcas[(int)$fila['brand_id']] ?? '',
            'imagenes' => $imagenProducto,
            'tallas' => $variante['tallas'],
            'colores' => $variante['colores'],
            'destacado' => (bool)$fila['is_featured'],
            'novedad' => (bool)$fila['is_new'],
        ];
    }

    private function imagenesPorProducto() {
        $filas = $this->consultar(
            'SELECT product_id, image_url FROM product_images ORDER BY product_id, sort_order, id'
        );
        $mapa = [];
        foreach ($filas as $fila) {
            $mapa[(int)$fila['product_id']][] = $fila['image_url'];
        }
        return $mapa;
    }

    private function variantesPorProducto() {
        $filas = $this->consultar(
            'SELECT product_id, size, color_name, color_hex
             FROM product_variants ORDER BY product_id, id'
        );
        $mapa = [];
        foreach ($filas as $fila) {
            $producto = (int)$fila['product_id'];
            if (!isset($mapa[$producto])) {
                $mapa[$producto] = ['tallas' => [], 'colores' => [], '_colores' => []];
            }
            if (!in_array($fila['size'], $mapa[$producto]['tallas'], true)) {
                $mapa[$producto]['tallas'][] = $fila['size'];
            }
            $nombre = $fila['color_name'];
            if (!isset($mapa[$producto]['_colores'][$nombre])) {
                $mapa[$producto]['_colores'][$nombre] = true;
                $mapa[$producto]['colores'][] = ['nombre' => $nombre, 'hex' => $fila['color_hex']];
            }
        }
        foreach (array_keys($mapa) as $producto) {
            unset($mapa[$producto]['_colores']);
        }
        return $mapa;
    }

    private function abrirSesion($usuario) {
        $nombre = trim(($usuario['first_name'] ?? '') . ' ' . ($usuario['last_name'] ?? ''));
        $_SESSION['usuario_id'] = (int)$usuario['id'];
        $_SESSION['usuario'] = [
            'nombre' => $nombre !== '' ? $nombre : $usuario['email'],
            'email' => $usuario['email'],
        ];
        $this->ejecutar(
            'UPDATE cart_items SET user_id = ? WHERE session_id = ? AND user_id IS NULL',
            [(int)$usuario['id'], $this->sesionId()]
        );
        $this->ejecutar(
            'UPDATE wishlist_items SET user_id = ? WHERE session_id = ? AND user_id IS NULL',
            [(int)$usuario['id'], $this->sesionId()]
        );
    }

    private function imagenProducto($id, $archivo) {
        if (!empty($archivo)) {
            return '/img/' . ltrim($archivo, '/');
        }
        return '/img/product-' . ((($id - 1) % 9) + 1) . '.jpg';
    }

    private function productoActivo($id) {
        if ($id <= 0) {
            return false;
        }
        return (bool)$this->uno('SELECT id FROM products WHERE id = ? AND is_active = 1', [$id]);
    }

    private function mapa($tabla) {
        $filas = $this->consultar("SELECT id, slug FROM {$tabla}");
        $mapa = [];
        foreach ($filas as $fila) {
            $mapa[(int)$fila['id']] = $fila['slug'];
        }
        return $mapa;
    }

    private function sesionId() {
        return session_id() ?: 'sesion-anonima';
    }

    private function usuarioId() {
        return isset($_SESSION['usuario_id']) ? (int)$_SESSION['usuario_id'] : null;
    }

    private function texto($valor) {
        return mb_substr(trim((string)$valor), 0, 50);
    }

    private function entrada($clave, $porDefecto = null) {
        $cuerpo = $this->cuerpo();
        if (array_key_exists($clave, $cuerpo)) {
            return $cuerpo[$clave];
        }
        if (array_key_exists($clave, $_POST)) {
            return $_POST[$clave];
        }
        if (array_key_exists($clave, $_GET)) {
            return $_GET[$clave];
        }
        return $porDefecto;
    }

    private function cuerpo() {
        if ($this->cuerpoCache !== null) {
            return $this->cuerpoCache;
        }
        $datos = json_decode((string)file_get_contents('php://input'), true);
        $this->cuerpoCache = is_array($datos) ? $datos : [];
        return $this->cuerpoCache;
    }

    private function error($mensaje, $codigo = 400) {
        http_response_code($codigo);
        $this->json(['error' => $mensaje]);
    }

    private function consultar($sql, $params = []) {
        try {
            $db = Database::connect();
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();
        } catch (PDOException $error) {
            error_log('Error en la API: ' . $error->getMessage());
            return [];
        }
    }

    private function ejecutar($sql, $params = []) {
        try {
            $db = Database::connect();
            $stmt = $db->prepare($sql);
            return $stmt->execute($params);
        } catch (PDOException $error) {
            error_log('Error en la API: ' . $error->getMessage());
            return false;
        }
    }

    private function uno($sql, $params = []) {
        $filas = $this->consultar($sql, $params);
        return $filas[0] ?? null;
    }
}
