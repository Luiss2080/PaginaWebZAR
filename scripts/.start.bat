@echo off
setlocal

echo ==============================================
echo Iniciando el entorno de desarrollo MultiShop...
echo ==============================================

:: Moverse al directorio raíz del proyecto
cd "%~dp0.."

:: Verificar dependencias de PHP
if exist "composer.json" (
    if not exist "vendor" (
        echo Instalando dependencias de Composer...
        call composer install
    ) else (
        echo Dependencias de Composer ya instaladas.
    )
)

:: Verificar dependencias de Node/NPM
if exist "package.json" (
    if not exist "node_modules" (
        echo Instalando dependencias de Node...
        call npm install
    ) else (
        echo Dependencias de Node ya instaladas.
    )
)

echo.
echo ==============================================
echo Servidor de PHP en ejecucion en: http://localhost:8000
echo ==============================================
echo Presiona Ctrl+C en esta terminal para detener el servidor

:: Iniciar el servidor local de PHP en el directorio actual (raíz)
php -S localhost:8000
