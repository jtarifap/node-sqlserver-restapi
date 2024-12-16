# node-sqlserver-restapi

Una REST API construida con Node.js para gestionar un CRUD de una tabla `products` en SQL Server. Esta aplicación utiliza `Express` como framework principal, `mssql` para la conexión con la base de datos y otras dependencias para facilitar el desarrollo.

## Requisitos previos

Asegúrate de tener instalados los siguientes requisitos antes de comenzar:

- Node.js (v16 o superior)
- SQL Server (con una base de datos configurada y acceso a una tabla `products`)
- Un editor de texto o IDE (Visual Studio Code recomendado)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/node-sqlserver-restapi.git
   cd node-sqlserver-restapi
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con la configuración de tu base de datos. Ejemplo:

   ```env
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_SERVER=localhost
   DB_DATABASE=nombre_de_tu_base
   DB_PORT=1433
   ```

4. Asegúrate de que el puerto especificado en `src/index.js` esté disponible (por defecto: 3000).

## Uso

1. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

2. La API estará disponible en: `http://localhost:3000`

## Endpoints

La API incluye las siguientes operaciones CRUD sobre la tabla `products`:

- **GET** `/products`: Obtiene todos los productos.
- **GET** `/products/:id`: Obtiene un producto por su ID.
- **POST** `/products`: Crea un nuevo producto.
- **PUT** `/products/:id`: Actualiza un producto existente por su ID.
- **DELETE** `/products/:id`: Elimina un producto por su ID.

### Ejemplo de un producto

```json
{
  "id": 1,
  "name": "cargador hp",
  "price": 35,
  "quantity": 5,
  "description": "cargador laptop hp"
}
```

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
      ```bash
      npm init -y  **** (crea archivo package.json para crear dependencias,...)
      ```
- **Express**: Framework para crear la API REST.
      ```bash
      npm i express  **** (crea código servidor más sencillo con funciones precreadas)
      ```
- **mssql**: Conexión con SQL Server.
- **dotenv**: Gestión de variables de entorno.
- **cors**: Habilitar Cross-Origin Resource Sharing.
- **morgan**: Middleware para registro de peticiones HTTP.
- **nodemon**: Recargar el servidor en modo desarrollo.

## Estructura del proyecto

```
node-sqlserver-restapi/
├── src/
│   ├── database         
│       └── connection.js            # Configuración de la conexión a la base de datos SQL Server
│   ├── contollers      
│       └── products.controllers.js  # Controladores del CRUD de products
│   └── routes/
│       └── products.routes.js       # Rutas de la API para los productos
│   ├── app.js
│   ├── config.js                    # Configuraciones a base de datos, server, apiKey y otros (npm install dotenv --save)
│   ├── index.js                  
├── .env                             # Archivo de ejemplo para variables de entorno
├── dbSql/
│       └── db.sql                   # pruebas SQL para ejecutar directamente (es necesario tener instalada la extensión `SQL Server (mssql)`)
├── package.json                     # Información del proyecto y dependencias
└── README.md                        # Documentación del proyecto
```

## Contribuir

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Descripción de los cambios"
   ```
4. Envía tus cambios al repositorio remoto:
   ```bash
   git push origin nueva-funcionalidad
   ```
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la licencia ISC. Consulta el archivo `LICENSE` para más detalles.

