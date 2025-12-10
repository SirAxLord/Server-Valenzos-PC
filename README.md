# Valenzos-PC – Backend

API REST construida con `Express` y `Mongoose` para gestionar productos y servicios de Valenzos-PC, con autenticación JWT y control de roles (usuario/admin).

**Stack:** `Node.js (CommonJS)`, `Express 5`, `MongoDB (Mongoose 8)`, `JWT`, `bcrypt`, `cors`, `dotenv`.

## Estructura

- `src/app.js`: Punto de entrada. Carga variables de entorno y arranca el servidor.
- `src/config/server.js`: Configura Express, CORS, JSON y registra rutas. Lee `PORT`.
- `src/config/database.js`: Conexión a MongoDB en `mongodb://localhost:27017` y BD `valenzos_pc_db`.
- `src/routes/`: Define endpoints de `products`, `services`, `auth`.
- `src/controllers/`: Lógica de negocio y respuestas HTTP.
- `src/models/`: Esquemas Mongoose: `Product`, `Service`, `User`.
- `src/middelwares/`: `verifyJWT` (auth), `verifyAdminRole` (autorización).

## Requisitos

- `Node.js` 18+ recomendado.
- `MongoDB` local corriendo en `mongodb://localhost:27017`.

## Instalación

```powershell
npm install
```

## Variables de entorno

Crear archivo `.env` en la raíz con:

```env
PORT=8080
SECRET_KEY=un_secreto_seguro_para_firmar_jwt
```

Notas:
- `PORT` es opcional; por defecto usa `8080`.
- `SECRET_KEY` es obligatorio para firmar/verificar tokens.

## Ejecutar

- Desarrollo (watch):

```powershell
npm run dev
```

El servidor inicia y escucha en `http://localhost:8080` (o el puerto configurado).

## Autenticación y Autorización

- Login y registro via `/api/auth`.
- JWT: se devuelve en `login` y debe enviarse en el header `Authorization: Bearer <token>`.
- Rutas protegidas:
	- Lectura individual (`GET /api/products/:id`, `GET /api/services/:id`) requiere JWT.
	- Escritura (`POST/PUT/DELETE` en products/services) requiere JWT + rol `admin`.

## Modelos

- `Product`: `{ title: String, description: String, price: Number, iconName: String, image: String }`
- `Service`: `{ title: String, description: String, iconName: String }`
- `User`: `{ username: String, password: String, role: 'user'|'admin' (por defecto 'user') }`

## Endpoints

### Auth

- `POST /api/auth/login`
	- Body: `{ username, password }`
	- Respuesta (200): `{ msg, token }`

- `POST /api/auth/:registro`
	- Nota: La ruta está definida como parámetro (`:registro`). Se recomienda consumirla como `POST /api/auth/registro`.
	- Body: `{ username, password, role? }` (`role` opcional: `user`|`admin`).
	- Respuesta (200): `{ msg }`

### Products

- `GET /api/products`
	- Query opcional: `searchTerm` (regex sobre `title`).
	- Respuesta (200): `Product[]`.

- `GET /api/products/:id` (JWT)
	- Respuesta (200): `{ result: Product }`

- `POST /api/products` (JWT + admin)
	- Body requerido: `{ title, description, price, iconName, image }`
	- Respuesta (201): `{ msg, savedProduct }`

- `PUT /api/products/:id` (JWT + admin)
	- Body requerido: `{ title, description, price, iconName, image }`
	- Respuesta (200): `{ msg, result }` o `404` si no existe.

- `DELETE /api/products/:id` (JWT + admin)
	- Respuesta (200): `{ msg }` o `404` si no existe.

### Services

- `GET /api/services`
	- Query opcional: `searchTerm` (regex sobre `title`).
	- Respuesta (200): `Service[]`.

- `GET /api/services/:id` (JWT)
	- Respuesta (200): `{ result: Service }`

- `POST /api/services` (JWT + admin)
	- Body requerido: `{ title, description, iconName }`
	- Respuesta (201): `{ msg, savedService }`

- `PUT /api/services/:id` (JWT + admin)
	- Body requerido: `{ title, description, iconName }`
	- Respuesta (200): `{ msg, result }` o `404` si no existe.

- `DELETE /api/services/:id` (JWT + admin)
	- Respuesta (200): `{ msg }` o `404` si no existe.

## Ejemplos de uso (PowerShell)

1) Registrar usuario:
```powershell
curl -Method POST -Uri http://localhost:8080/api/auth/registro -ContentType 'application/json' -Body '{"username":"admin","password":"123456","role":"admin"}'
```

2) Login y guardar token:
```powershell
$response = Invoke-RestMethod -Method POST -Uri http://localhost:8080/api/auth/login -ContentType 'application/json' -Body '{"username":"admin","password":"123456"}';
$TOKEN = $response.token
```

3) Crear producto (admin):
```powershell
Invoke-RestMethod -Method POST -Uri http://localhost:8080/api/products -Headers @{ Authorization = "Bearer $TOKEN" } -ContentType 'application/json' -Body '{"title":"RAM 16GB","description":"DDR4","price":45,"iconName":"ram","image":"https://..."}'
```

4) Listar productos con búsqueda:
```powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/api/products?searchTerm=RAM"
```

## Errores comunes

- `401 Token inválido`: Verificar header `Authorization: Bearer <token>` y `SECRET_KEY`.
- `404 No se encontró`: El `id` no existe o fue eliminado.
- `400 Datos incompletos`: Revisar body requerido según endpoint.
- Conexión a Mongo: Asegurar que el servicio `mongodb` está corriendo en local.

## Desarrollo

- Formato: CommonJS (`type: "commonjs"` en `package.json`).
- Scripts:
	- `npm run dev`: ejecuta `node --watch src/app` para recarga en cambios.

## Seguridad y roles

- Contraseñas almacenadas con `bcrypt` (hash + salt).
- Tokens JWT con expiración de `4h`.
- `verifyAdminRole` protege operaciones de escritura.

## Futuras mejoras sugeridas

- Cambiar `POST /api/auth/:registro` a ruta fija `/api/auth/registro`.
- Añadir validaciones de esquema (Mongoose `required`, tipos, etc.).
- Paginación y ordenamiento en listados.
- Tests automatizados y linting.
