# Tarea 4 – Almacenamiento y Consultas de Datos en Big Data
## Implementación de base de datos NoSQL en MongoDB

Este repositorio contiene la implementación de una base de datos NoSQL en **MongoDB** para una **tienda virtual de productos tecnológicos**, desarrollada como parte de la Tarea 4 del curso “Almacenamiento y Consultas de Datos en Big Data”.

El objetivo es aplicar los conceptos de bases de datos NoSQL orientadas a documentos, diseñando colecciones, insertando datos de prueba y ejecutando consultas CRUD y de agregación que permitan analizar la información almacenada.



##  Estructura del repositorio

- `tienda_tecno_mongodb.js`  
  Archivo principal con todas las instrucciones en MongoDB:
  - Selección de la base de datos.
  - Inserción de datos en las colecciones `usuarios`, `productos`, `pedidos` y `carrito`.
  - Operaciones CRUD.
  - Consultas con filtros.
  - Consultas de agregación sobre ventas, ingresos y carritos de compra.

> Nota: El archivo está organizado por secciones con comentarios para facilitar su lectura y ejecución.



## Modelo de datos

El caso de estudio corresponde a una tienda virtual de productos tecnológicos. Para representar la información se diseñaron cuatro colecciones principales:

- **usuarios**: almacena la información de los clientes (nombre, correo, dirección, fecha de registro, estado).  
- **productos**: contiene el catálogo de productos (nombre, categoría, marca, precio, stock, rating, fecha de creación).  
- **pedidos**: registra las compras realizadas (usuario, items adquiridos, total, método de pago, estado, fecha de pedido).  
- **carrito**: guarda los productos que los usuarios agregan temporalmente antes de concretar una compra.

Este diseño aprovecha la flexibilidad del modelo documental de MongoDB, permitiendo anidar información relacionada dentro de un mismo documento (por ejemplo, los items de cada pedido).

---

## Instrucciones de ejecución

### 1. Requisitos previos

- Tener instalado **MongoDB** y la consola `mongosh` o un cliente compatible.  
- Tener el servicio de MongoDB en ejecución en el equipo local o en el servidor donde se vaya a probar.

### 2. Cargar el archivo de script

1. Clonar o descargar este repositorio en el equipo local.  
2. Abrir una terminal y ubicarse en la carpeta donde se encuentra el archivo `tienda_tecno_mongodb.js`.  
3. Abrir la consola de MongoDB (por ejemplo: `mongosh`).  
4. Ejecutar el archivo de la siguiente manera:

   ```bash
   mongosh < tienda_tecno_mongodb.js

