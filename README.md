# APACHE CORDOVA - Proyecto de investigación
Proyecto de investigación para el curso de Diseño y Programación de Aplicaciones Móviles.

## Índice
1. [Integrantes](#integrantes)
2. [Instalación](#instalación)
3. [Configuración](#configuración) 
4. [Uso](#uso)

## Integrantes
* Anthony Daniel Briones Vargas
* Daisy Cedeño Sanabria
* Glend Rojas Alvarado
* Jamel Sandí Anderson

# Instalación
Clona el siguiente repositorio:
```bash
git clone https://github.com/ApacheCordovaINV/ApacheCordova.git
```
>[!NOTE]
>Para tener acceso al backend, dirígete al siguiente enlace y sigue los pasos de instalación:
```bash
https://github.com/ApacheCordovaINV/Basic_API
```

# Configuración
## Instalar dependecias globales
Una vez clonado el repositorio, se debe verificar que tenemos instalado **Node.js**.
Para eso, podemos usar los siguientes comandos:
```bash
node -v
npm -v
```
>[!NOTE]
>En caso de no tener instalado **Node.js** descargar la versión LTS en el siguiente enlace:
```bash
https://nodejs.org/en
```
Ya con acceso a **Node.js** instalamos apache cordova globalmente:
```bash
npm install -g cordova
```
## Instalar dependencias locales
Estando en la carpeta base del proyecto instalamos las dependencias necesarias:
```bash
npm install
```
## Agregar las plataformas
Para android
```bash
cordova platform add android
```
Para el navegador
```bash
cordova platform add browser
```
## Instalar plugins
Instala los plugins y agrega los archivos a cada plataforma
```bash
cordova prepare
```


## Uso
Una vez configurado el proyecto se puede ejecutar con el siguiente comando:

### Android
```bash
cordova run android
```

### Navegador
```bash
cordova run browser
```