# MultiShop - E-commerce MVC Framework

## 📋 Descripción

MultiShop es una aplicación de tienda online desarrollada en PHP siguiendo el patrón de arquitectura MVC (Modelo-Vista-Controlador). Esta aplicación ha sido migrada desde archivos HTML estáticos a una estructura PHP bien organizada y escalable.

## 🚀 Características

- **Arquitectura MVC**: Separación clara de responsabilidades
- **Sistema de Enrutamiento**: URLs amigables y semánticas
- **Gestión de Productos**: Catálogo completo con categorías y filtros
- **Carrito de Compras**: Funcionalidad completa de e-commerce
- **Panel de Usuario**: Gestión de perfil, pedidos y lista de deseos
- **Sistema de Autenticación**: Login, registro y recuperación de contraseña
- **Diseño Responsive**: Compatible con todos los dispositivos
- **Base de Datos MySQL**: Estructura optimizada para e-commerce

## 📁 Estructura del Proyecto

```
PaginaWebZAR/
│
├── 📄 index.php                        # Punto de entrada principal
├── 📄 .htaccess                        # Configuración Apache (URL amigables)
│
├── 📁 app/                             # Núcleo de la aplicación (MVC)
│   ├── 📁 controllers/                 # Controladores
│   ├── 📁 models/                      # Modelos (Lógica de negocio y BD)
│   ├── 📁 views/                       # Vistas (HTML/Templates)
│   ├── 📁 core/                        # Núcleo del framework
│   └── 📁 helpers/                     # Funciones auxiliares
│
├── 📁 public/                          # Archivos públicos (accesibles web)
│   ├── 📁 css/                         # Hojas de estilo CSS
│   ├── 📁 js/                          # JavaScript
│   ├── 📁 images/                      # Imágenes
│   └── 📁 libs/                        # Librerías externas
│
├── 📁 config/                          # Configuración
├── 📁 database/                        # Base de datos y migraciones
└── 📄 README.md                        # Este archivo
```

## 🛠️ Instalación

### Prerrequisitos

- XAMPP, WAMP o servidor web con PHP 7.4+
- MySQL 5.7+ o MariaDB
- Navegador web moderno

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si usas Git
   git clone [URL_DEL_REPOSITORIO]
   
   # O descargar y extraer el ZIP en htdocs/
   ```

2. **Configurar el servidor web**
   - Copiar el proyecto a `C:\xampp\htdocs\PaginaWebZAR\` (Windows)
   - O `/opt/lampp/htdocs/PaginaWebZAR/` (Linux)

3. **Crear la base de datos**
   - Abrir phpMyAdmin o tu gestor de BD preferido
   - Importar el archivo `database/schema.sql`
   - O ejecutar manualmente las consultas SQL

4. **Configurar la base de datos**
   - Editar `config/database.php`
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

**MultiShop** - Tu tienda online MVC en PHP 🛍️