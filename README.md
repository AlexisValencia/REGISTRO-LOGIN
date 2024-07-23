# Registro y Login Application

Esta aplicación permite el registro y login de usuarios utilizando Node.js, Express, y otras librerías útiles para la autenticación y manejo de cookies.

## Tecnologías utilizadas

- Node.js
- Express
- Morgan
- MySQL2
- Dotenv
- Bcryptjs
- Cookie-parser
- JSONwebtoken
- Nodemon

## Instalación

Sigue estos pasos para instalar y configurar la aplicación:

1. Instalar la última versión de npm:
    ```sh
    npm install npm@latest
    ```

2. Instalar la última versión de Node.js:
    ```sh
    npm install node@latest
    ```

3. Inicializar el archivo `package.json` de la aplicación:
    ```sh
    npm init -y
    ```

4. Instalar las dependencias necesarias:
    ```sh
    npm install express morgan mysql2 dotenv bcryptjs cookie-parser jsonwebtoken
    ```

5. Instalar Nodemon como dependencia de desarrollo:
    ```sh
    npm install nodemon --save-dev
    ```

## Uso

1. Configura las variables de entorno en un archivo `.env`. Aquí tienes un ejemplo de las variables necesarias:

    ```env
    HOST=localhost
    USER=root
    PASSWORD=yourpassword
    DATABASE=yourdatabase
    PORT=3306
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRATION=7d
    JWT_COOKIE_EXPIRES=1

    ```

2. Ejecuta la aplicación en modo desarrollo con Nodemon:
    ```sh
    npx nodemon index.js
    ```

## Estructura del Proyecto

A continuación, se muestra una estructura sugerida para el proyecto:

