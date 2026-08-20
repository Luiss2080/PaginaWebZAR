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

:: Intentar encontrar la ruta de PHP de Laragon
set PHP_EXE=php
if exist "C:\laragon\bin\php\" (
    for /f "delims=" %%i in ('dir /b /ad "C:\laragon\bin\php\*"') do (
        if exist "C:\laragon\bin\php\%%i\php.exe" (
            set PHP_EXE="C:\laragon\bin\php\%%i\php.exe"
            goto :found_php
        )
    )
)
:found_php

:: Iniciar el servidor local de PHP en el directorio actual (raíz)
%PHP_EXE% -S localhost:8000
