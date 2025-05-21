# Proyecto [Nombre del Proyecto]

Este proyecto implementa un servidor con Express y MongoDB, proporcionando rutas y controladores para gestionar productos y servicios, así como autenticación básica.

## 🚀 Tecnologías Utilizadas
- **MongoDB** – Conexión a la base de datos.
- **Express** – Estructura del servidor.
- **JWT & Bcrypt** – Autenticación y seguridad.
- **Cors & Express.json** – Middleware esencial.

## 📌 Características
- Rutas definidas para los recursos: `products`, `services`, `auth`.
- Controladores con lógica **CRUD** (Crear, Leer, Actualizar, Eliminar) para productos y servicios.
- Autenticación básica: registro y login con **hasheo de contraseñas**.
- Middleware: `cors()` para peticiones desde distintos dominios y `express.json()` para manejar datos JSON.
