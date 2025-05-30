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

# Configuración
## Instalar dependencias globales
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

## Descargar Java
Descargar una versión de JAVA como puede ser JDK 21 e instalamos:

https://www.oracle.com/java/technologies/downloads/?er=221886

## Descargar Android Studio
https://developer.android.com/studio?hl=es-419

## Descargar Gradle
https://gradle.org/releases/

## Pasar Gradle a el Dico local C
Copiar la carpeta comprimida y pegarla en el Disco local C y descomprimirla

## Entrar a la carpeta Graddle y luego a la carpeta bin y copiar la ruta

## Configurar las variables de entorno
En variables de entorno del sistema agregar una nueva variable:
1. JAVA_HOME
    * Nombre: **JAVA_HOME**
    * Valor: Ruta del JDK, ejemplo:  **C:\Program Files\Java\jdk-11.0.22**
2. ANDROID_HOME
    * Nombre: **ANDROID_HOME**
    * Valor: Ejemplo: **C:\Users\TU_USUARIO\AppData\Local\Android\Sdk**

### Agregar estas variables en PATH
>[!NOTE]
>Agregar una a una
```bash
%JAVA_HOME%\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
C:\Gradle\gradle-8.7\bin
```
## En caso de error con el plugin whitelist
Eliminar el plugin actual:
```bash
cordova plugin rm cordova-plugin-whitelist
```
Instalar una versión compatible:
```bash
cordova plugin add cordova-plugin-whitelist@1.3.5
```
Limpiar y reconstruir las plataformas:
```bash
cordova platform rm android
cordova platform add android
cordova build android
```

## Uso
Una vez configurado el proyecto se puede ejecutar con el siguiente comando:

### Android
```bash
cordova build android
```

```bash
cordova run android
```

### Navegador
```bash
cordova run browser
```



# Apache Cordova CRUD App TEST

![CI - Pruebas Automáticas](https://github.com/TU_USUARIO/TU_REPO/workflows/CI%20-%20Pruebas%20Automáticas/badge.svg)

## Descripción

## Cómo ejecutar las pruebas

### Localmente
```bash
npm install
npm test


## Link del video
https://youtu.be/u7YoHVaHr0U