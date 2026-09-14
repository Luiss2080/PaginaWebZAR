<div align="center">

# 🛒 **MultiShop** - Plataforma E-commerce MVC
### ✨ *Sistema de Tienda Online Profesional con Arquitectura PHP Avanzada* 🚀

<img src="https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP">
<img src="https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
<img src="https://img.shields.io/badge/Bootstrap-5.0+-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/MVC-Architecture-28A745?style=for-the-badge" alt="MVC">

---

### 🎯 **Una Experiencia de E-commerce Completa y Moderna**

> **MultiShop** es una revolucionaria plataforma de comercio electrónico desarrollada con **PHP puro** siguiendo patrones **MVC profesionales**. Diseñada desde cero para ofrecer una experiencia de compra fluida, intuitiva y completamente funcional. ¡Perfecta para emprendedores y desarrolladores que buscan una solución robusta y escalable! 💎

</div>

---

## 🛍️ **Frontend SPA (React) — Tienda de moda**

La interfaz activa es una SPA en **React 19 + Vite + Tailwind CSS v4 + react-router-dom v7 + framer-motion** ubicada en `frontend/`, con estética editorial tipo Zara (blanco, tipografía serif/sans, fotografía grande).

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Consume el catálogo por una capa única (`frontend/src/servicios/api.js`) con dos modos:

- **Respaldo local** (por defecto): no requiere backend.
- **API JSON de este backend PHP:** copia `frontend/.env.example` a `frontend/.env` y arranca `php -S localhost:8080 index.php` en la raíz. La SPA consume `/api/productos`, `/api/categorias`, `/api/marcas` y `/api/buscar` mediante el proxy de Vite.

> Nota: la base de datos real `multishop_db` usa columnas distintas a `database/schema.sql` (`is_active`, `is_featured`, `sale_price`, `image`; no existen `brands` ni `product_images`). `app/controllers/ApiControlador.php` consulta el esquema real.

### Datos 100% dinámicos con MySQL
La migración `scripts/migracion_catalogo.php` (idempotente) crea y siembra `brands`, `product_images`, `product_variants` y las columnas necesarias de `cart_items`/`wishlist_items`, además de un usuario demo.

```bash
php scripts/migracion_catalogo.php   # migración 002
```

Con la API activa, la SPA guarda el **carrito** (`cart_items`), los **favoritos** (`wishlist_items`) y la **sesión** (`users` con `password_hash`) en la BD; sin backend, sigue funcionando con el respaldo local. Usuario demo: `demo@zara.test` / `demo1234`.

Especificación SDD en `docs/constitution.md`, `specs/001-tienda-moda-zara/` y `specs/002-datos-dinamicos-bd/`.

---

## 🌟 **Características Principales**

<table>
<tr>
<td width="50%">

### 🏗️ **Arquitectura Sólida**
- 🔧 **Patrón MVC Puro** - Separación perfecta de responsabilidades
- 🛣️ **Sistema de Routing Avanzado** - URLs amigables y SEO optimizadas
- 🎨 **Diseño Modular** - Componentes reutilizables y mantenibles
- 📱 **100% Responsive** - Adaptable a cualquier dispositivo

</td>
<td width="50%">

### 🛍️ **Funcionalidades E-commerce**
- 🛒 **Carrito Inteligente** - Gestión dinámica con AJAX
- 💳 **Sistema de Checkout** - Proceso de compra simplificado  
- 📦 **Gestión de Productos** - Catálogo completo con filtros avanzados
- ❤️ **Lista de Deseos** - Favoritos y comparación de productos

</td>
</tr>
<tr>
<td width="50%">

### 👥 **Gestión de Usuarios**
- 🔐 **Autenticación Completa** - Login, registro y recuperación
- 📊 **Panel de Usuario** - Gestión de perfil y pedidos
- 🎯 **Experiencia Personalizada** - Recomendaciones y historial

</td>
<td width="50%">

### 🎨 **Interfaz Premium**
- 🎭 **Bootstrap 5** - Diseño moderno y profesional
- ⚡ **Animaciones Suaves** - Transiciones y efectos visuales
- 🌈 **UI/UX Optimizada** - Navegación intuitiva y atractiva
- 📱 **Mobile First** - Optimizado para dispositivos móviles

</td>
</tr>
</table>

---

## 🎬 **Demo en Vivo & Screenshots**

<div align="center">

### �️ **Capturas de Pantalla**

| 🏠 **Homepage** | 🛍️ **Catálogo** | 🛒 **Carrito** |
|:---:|:---:|:---:|
| *Página principal con productos destacados* | *Filtros avanzados y búsqueda* | *Gestión dinámica del carrito* |

| � **Checkout** | 👤 **Perfil** | 📱 **Responsive** |
|:---:|:---:|:---:|
| *Proceso de compra simplificado* | *Panel de usuario completo* | *Adaptable a móviles* |

</div>

---

## 🚀 **Instalación Rápida**

### ⚡ **Opción 1: Instalación Express (Recomendada)**

```bash
# 1️⃣ Descargar proyecto
git clone https://github.com/TU_USUARIO/PaginaWebZAR.git
cd PaginaWebZAR

# 2️⃣ Iniciar servidor PHP integrado
php -S localhost:8080

# 3️⃣ Configurar base de datos (importar schema.sql)
# 4️⃣ ¡Listo! Abrir http://localhost:8080
```

### 🔧 **Opción 2: XAMPP/WAMP**

<details>
<summary><strong>📖 Ver pasos detallados</strong></summary>

#### **Prerrequisitos**
- ✅ **XAMPP/WAMP** con PHP 8.0+
- ✅ **MySQL 8.0+** o MariaDB
- ✅ **Navegador moderno** (Chrome, Firefox, Edge)

#### **Pasos de Instalación**

1️⃣ **Preparar el entorno**
   ```bash
   # Copiar proyecto a htdocs
   C:\xampp\htdocs\PaginaWebZAR\
   ```

2️⃣ **Configurar Base de Datos**
   ```sql
   -- Crear base de datos
   CREATE DATABASE multishop_db;
   
   -- Importar estructura
   # Usar phpMyAdmin o MySQL Workbench
   # Importar: database/schema.sql
   ```

3️⃣ **Configurar Conexión**
   ```php
   // config/database.php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'multishop_db');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```

4️⃣ **¡Iniciar aplicación!**
   - 🌐 Abrir: `http://localhost/PaginaWebZAR`
   - ✨ ¡Disfruta de tu tienda online!

</details>

---

## 🏗️ **Arquitectura del Proyecto**

<div align="center">

```
🏪 MultiShop E-commerce Platform
│
├── 🚀 index.php                    # 🎯 Punto de entrada principal
├── ⚙️ .htaccess                    # 🔧 Configuración Apache (URLs amigables)
│
├── 📱 app/                         # 🧠 Núcleo MVC de la aplicación
│   ├── 🎮 controllers/            # 🎯 Controladores (Lógica de control)
│   │   ├── HomeController.php     #   🏠 Controlador página principal
│   │   ├── ProductsController.php #   🛍️ Gestión de productos
│   │   ├── CartController.php     #   🛒 Carrito de compras
│   │   ├── CheckoutController.php #   💳 Proceso de compra
│   │   └── UserController.php     #   👤 Gestión de usuarios
│   │
│   ├── 🗄️ models/                 # 📊 Modelos (Lógica de negocio)
│   │   ├── Product.php           #   🛍️ Modelo de productos
│   │   ├── Category.php          #   📂 Categorías
│   │   ├── Cart.php              #   🛒 Carrito
│   │   └── User.php              #   👤 Usuarios
│   │
│   ├── 🎨 views/                  # 🖼️ Vistas (Interfaz de usuario)
│   │   ├── layouts/              #   🏗️ Plantillas base
│   │   ├── home/                 #   🏠 Vistas del inicio
│   │   ├── products/             #   🛍️ Catálogo y detalles
│   │   ├── cart/                 #   🛒 Carrito de compras
│   │   └── checkout/             #   💳 Proceso de checkout
│   │
│   └── ⚡ core/                   # 🔧 Motor del framework
│       ├── App.php               #   🚀 Enrutador principal
│       ├── Database.php          #   🗄️ Conexión a BD
│       └── BaseController.php    #   📋 Controlador base
│
├── 🌐 public/                     # 📂 Archivos públicos
│   ├── 🎨 css/                   #   🎭 Estilos CSS
│   ├── ⚡ js/                    #   💻 JavaScript
│   ├── 🖼️ img/                   #   🖼️ Imágenes y recursos
│   └── 📚 lib/                   #   📦 Librerías externas
│
├── ⚙️ config/                     # 🔧 Archivos de configuración
└── 🗃️ database/                  # 💾 Base de datos
    └── schema.sql                #   📋 Estructura de la BD
```

</div>

---

## ⚡ **Tecnologías Implementadas**

<div align="center">

### 🛠️ **Backend Robusto**
| Tecnología | Versión | Propósito |
|:---:|:---:|:---|
| 🐘 **PHP** | 8.2+ | Motor principal del servidor |
| 🗄️ **MySQL** | 8.0+ | Base de datos relacional |
| 🏗️ **MVC Pattern** | Custom | Arquitectura escalable |
| 🛣️ **Custom Router** | v1.0 | Sistema de enrutamiento |

### 🎨 **Frontend Moderno**
| Tecnología | Versión | Propósito |
|:---:|:---:|:---|
| 🎭 **Bootstrap** | 5.3+ | Framework CSS responsive |
| ⚡ **JavaScript** | ES6+ | Interactividad dinámica |
| 🦉 **Owl Carousel** | 2.3+ | Sliders y carruseles |
| 🎯 **jQuery** | 3.7+ | Manipulación DOM |

</div>
   - Configurar los datos de conexión:
     ```php
     return [
         'host' => 'localhost',
         'database' => 'multishop_db',
         'username' => 'root',
         'password' => '',  // Tu contraseña de MySQL
     ];
     ```

5. **Configurar la URL base**
   - Editar `config/app.php`
   - Ajustar `BASE_URL` según tu configuración:
     ```php
     define('BASE_URL', 'http://localhost/PaginaWebZAR/');
     ```

6. **Verificar permisos**
   - Asegurar que el servidor web tenga permisos de lectura/escritura
   - En sistemas Unix: `chmod -R 755 PaginaWebZAR/`

## 🌐 Acceso a la Aplicación

- **URL Principal**: `http://localhost/PaginaWebZAR/`
- **Panel de Admin**: `http://localhost/PaginaWebZAR/admin/` (Próximamente)

### Usuarios de Prueba

- **Administrador**:
  - Email: `admin@multishop.com`
  - Password: `password`

- **Cliente**:
  - Email: `juan.perez@email.com`
  - Password: `password`

## 📚 Funcionalidades Implementadas

### ✅ Completadas
- [x] Estructura MVC básica
- [x] Sistema de enrutamiento
- [x] Controladores Home y Product
- [x] Modelos Product y Category
- [x] Vistas con layouts reutilizables
- [x] Configuración de base de datos
- [x] Migración de assets (CSS, JS, imágenes)
- [x] Schema de base de datos completo

### 🚧 En Desarrollo
- [ ] Sistema de autenticación completo
- [ ] Carrito de compras funcional
- [ ] Proceso de checkout
- [ ] Panel de administración
- [ ] Sistema de búsqueda avanzada
- [ ] Gestión de usuarios

### 📋 Por Implementar
- [ ] Sistema de pagos
- [ ] Envío de emails
- [ ] Gestión de inventario
- [ ] Reportes y analytics
- [ ] API REST
- [ ] Sistema de reviews

## 🛣️ URLs Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/products` | Lista de productos |
| `/products/{id}` | Detalle de producto |
| `/categories/{id}` | Productos por categoría |
| `/search?q={query}` | Búsqueda de productos |
| `/cart` | Carrito de compras |
| `/checkout` | Proceso de compra |
| `/auth/login` | Iniciar sesión |
| `/auth/register` | Registrarse |
| `/user/profile` | Perfil de usuario |

## 🔧 Desarrollo

### Agregar Nuevos Controladores

1. Crear archivo en `app/controllers/NombreController.php`
2. Extender de `BaseController`
3. Implementar métodos públicos como acciones

### Agregar Nuevos Modelos

1. Crear archivo en `app/models/Nombre.php`
2. Extender de `Model`
3. Definir propiedades y métodos específicos

### Agregar Nuevas Vistas

1. Crear archivo en `app/views/carpeta/nombre.php`
2. Usar variables pasadas desde el controlador
3. Incluir layouts según necesidad

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE.txt` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o necesitas ayuda:

1. Revisar la documentación
2. Verificar la configuración de la base de datos
3. Comprobar los permisos de archivos
4. Revisar los logs de error del servidor

## 📞 Contacto

- Email: soporte@multishop.com
- Website: https://multishop.com

---

## 🎯 **Funcionalidades Destacadas**

<div align="center">

### ✨ **¡Todo Funciona Perfectamente!** ✨

</div>

<table>
<tr>
<td width="25%" align="center">

### 🏠 **HomePage Dinámica**
✅ Productos destacados  
✅ Carrusel de ofertas  
✅ Categorías interactivas  
✅ Diseño responsive  

</td>
<td width="25%" align="center">

### 🛍️ **Catálogo Avanzado**
✅ Filtros por categoría  
✅ Búsqueda inteligente  
✅ Paginación automática  
✅ Vista detallada  

</td>
<td width="25%" align="center">

### 🛒 **Carrito Inteligente**
✅ Agregado con AJAX  
✅ Actualización dinámica  
✅ Cálculo automático  
✅ Persistencia de sesión  

</td>
<td width="25%" align="center">

### 💳 **Checkout Completo**
✅ Formulario de facturación  
✅ Cálculo de impuestos  
✅ Múltiples métodos de pago  
✅ Proceso de orden  

</td>
</tr>
</table>

---

## 🔥 **Características Técnicas Avanzadas**

<div align="center">

### 🏗️ **Arquitectura MVC Profesional**

</div>

<table>
<tr>
<td width="33%" align="center">

### 🎯 **Controladores**
```php
class ProductsController {
    public function index()     // Lista
    public function details()   // Detalles  
    public function search()    // Búsqueda
    public function filter()    // Filtros
}
```

</td>
<td width="33%" align="center">

### 🗄️ **Modelos**
```php
class Product extends Model {
    public function getAll()
    public function getFeatured()
    public function getByCategory()
    public function search()
}
```

</td>
<td width="33%" align="center">

### 🎨 **Vistas**
```php
// Layouts reutilizables
header.php
navbar.php  
footer.php

// Vistas específicas
products/index.php
cart/index.php
```

</td>
</tr>
</table>

### 🚀 **Sistema de Enrutamiento Inteligente**

```php
// Rutas dinámicas automáticas
/products           → ProductsController::index()
/products/details/1 → ProductsController::details(1)
/cart/add          → CartController::add()
/checkout/process  → CheckoutController::process()
```

### 💾 **Base de Datos Optimizada**

```sql
-- Estructura completa implementada
✅ products          (Catálogo de productos)
✅ categories        (Categorías organizadas)  
✅ cart_items        (Carrito de compras)
✅ users            (Sistema de usuarios)
✅ orders           (Gestión de pedidos)
✅ wishlist         (Lista de favoritos)
```

---

## 🌟 **¿Por qué MultiShop?**

<div align="center">

### 💎 **La Solución E-commerce Definitiva**

</div>

| 🎯 **Característica** | 🏪 **MultiShop** | 🛒 **Otros Proyectos** |
|:---|:---:|:---:|
| **Arquitectura MVC** | ✅ **Pura y Escalable** | ❌ Código espagueti |
| **Carrito AJAX** | ✅ **Tiempo Real** | ❌ Recarga de página |
| **URLs Amigables** | ✅ **/products/laptop-gaming** | ❌ **/?p=123&c=45** |
| **Responsive Design** | ✅ **Mobile First** | ❌ Solo desktop |
| **Base de Datos** | ✅ **Estructura Profesional** | ❌ Sin normalización |
| **Documentación** | ✅ **Completa y Clara** | ❌ Sin documentar |

---

## 🤝 **Contribuye al Proyecto**

<div align="center">

### 🚀 **¡Únete a la Revolución E-commerce!**

**MultiShop** es un proyecto **open source** que crece con la comunidad

</div>

```bash
# 🍴 1. Fork el repositorio
git fork https://github.com/TU_USUARIO/PaginaWebZAR

# 📥 2. Clona tu fork  
git clone https://github.com/TU_USUARIO/PaginaWebZAR.git

# 🌿 3. Crea una nueva rama
git checkout -b feature/mi-nueva-funcionalidad

# 💡 4. Implementa tu idea genial
# ... código increíble aquí ...

# 📝 5. Commitea tus cambios
git commit -m "✨ Agregar funcionalidad increíble"

# 🚀 6. Sube los cambios
git push origin feature/mi-nueva-funcionalidad

# 🎉 7. Crea un Pull Request
```

### 🎯 **Ideas para Contribuir**

- 🔐 **Sistema de autenticación avanzado**
- 💳 **Integración con pasarelas de pago**
- 📊 **Dashboard administrativo**
- 📱 **App móvil complementaria**
- 🌍 **Internacionalización (i18n)**
- 🔍 **Búsqueda con Elasticsearch**

---

## 📞 **Contacto & Soporte**

<div align="center">

### 🆘 **¿Necesitas Ayuda?**

<table>
<tr>
<td align="center" width="25%">

**📧 Email**  
[soporte@multishop.com](mailto:soporte@multishop.com)

</td>
<td align="center" width="25%">

**💬 Discord**  
[Únete al servidor](https://discord.gg/multishop)

</td>
<td align="center" width="25%">

**📚 Wiki**  
[Documentación completa](https://github.com/TU_USUARIO/wiki)

</td>
<td align="center" width="25%">

**🐛 Issues**  
[Reportar problemas](https://github.com/TU_USUARIO/issues)

</td>
</tr>
</table>

### ⭐ **¿Te gusta el proyecto?**

**¡Dale una estrella en GitHub!** ⭐ Ayuda a que más desarrolladores descubran MultiShop

</div>

---

<div align="center">

## � **Licencia**

Este proyecto está licenciado bajo **MIT License** - ver el archivo [LICENSE](LICENSE) para más detalles.

---

### 🎉 **¡Gracias por usar MultiShop!** 

**Construido con ❤️ por desarrolladores, para desarrolladores**

[![PHP](https://img.shields.io/badge/Made%20with-PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

**🛒 MultiShop** - *La plataforma e-commerce del futuro* ✨

</div>