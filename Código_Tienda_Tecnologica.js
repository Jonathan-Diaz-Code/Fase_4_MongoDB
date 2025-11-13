// ================================
//   BASE DE DATOS PRINCIPAL
// ================================
use tienda_tecno;


// ================================
//   COLECCIÓN: USUARIOS
// ================================
db.usuarios.insertMany([
  {
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    direccion: {
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      pais: "Colombia"
    },
    fecha_registro: ISODate("2025-01-10T10:00:00Z"),
    estado: "activo"
  },
  {
    nombre: "Ana Gómez",
    correo: "ana.gomez@example.com",
    direccion: {
      ciudad: "Medellín",
      departamento: "Antioquia",
      pais: "Colombia"
    },
    fecha_registro: ISODate("2025-01-15T12:30:00Z"),
    estado: "activo"
  },
  {
    nombre: "Carlos Ruiz",
    correo: "carlos.ruiz@example.com",
    direccion: {
      ciudad: "Cali",
      departamento: "Valle del Cauca",
      pais: "Colombia"
    },
    fecha_registro: ISODate("2025-01-20T09:15:00Z"),
    estado: "inactivo"
  }
]);


// ================================
//   COLECCIÓN: PRODUCTOS
// ================================
db.productos.insertMany([
  {
    nombre: "Portátil Gamer X",
    categoria: "Portátiles",
    marca: "TechPro",
    precio: 4200000,
    stock: 15,
    rating_promedio: 4.7,
    fecha_creacion: ISODate("2025-01-05T08:00:00Z")
  },
  {
    nombre: "Mouse Inalámbrico Pro",
    categoria: "Accesorios",
    marca: "ClickMaster",
    precio: 85000,
    stock: 120,
    rating_promedio: 4.4,
    fecha_creacion: ISODate("2025-01-08T11:20:00Z")
  },
  {
    nombre: "Monitor 27 UHD",
    categoria: "Monitores",
    marca: "VisionMax",
    precio: 1550000,
    stock: 30,
    rating_promedio: 4.6,
    fecha_creacion: ISODate("2025-01-12T14:45:00Z")
  },
  {
    nombre: "Teclado Mecánico RGB",
    categoria: "Accesorios",
    marca: "KeyMaster",
    precio: 230000,
    stock: 60,
    rating_promedio: 4.5,
    fecha_creacion: new Date()
  }
]);


// ================================
//   COLECCIÓN: PEDIDOS
// ================================
db.pedidos.insertMany([
  {
    id_usuario: "juan.perez@example.com",
    items: [
      { producto: "Portátil Gamer X", cantidad: 1, precio_unitario: 4200000 },
      { producto: "Mouse Inalámbrico Pro", cantidad: 2, precio_unitario: 85000 }
    ],
    total: 4200000 + 2 * 85000,
    metodo_pago: "Tarjeta de crédito",
    estado: "entregado",
    fecha_pedido: ISODate("2025-02-01T16:30:00Z")
  },
  {
    id_usuario: "ana.gomez@example.com",
    items: [
      { producto: "Monitor 27 UHD", cantidad: 1, precio_unitario: 1550000 }
    ],
    total: 1550000,
    metodo_pago: "PSE",
    estado: "enviado",
    fecha_pedido: ISODate("2025-02-03T10:10:00Z")
  },
  {
    id_usuario: "juan.perez@example.com",
    items: [
      { producto: "Mouse Inalámbrico Pro", cantidad: 1, precio_unitario: 85000 }
    ],
    total: 85000,
    metodo_pago: "Efectivo",
    estado: "entregado",
    fecha_pedido: ISODate("2025-02-05T18:45:00Z")
  }
]);


// ================================
//   COLECCIÓN: CARRITO
// ================================
db.carrito.insertMany([
  {
    id_usuario: "juan.perez@example.com",
    productos: [
      { producto: "Mouse Inalámbrico Pro", cantidad: 1 },
      { producto: "Teclado Mecánico RGB", cantidad: 1 }
    ],
    fecha_actualizacion: ISODate("2025-02-06T09:00:00Z")
  },
  {
    id_usuario: "ana.gomez@example.com",
    productos: [
      { producto: "Portátil Gamer X", cantidad: 1 }
    ],
    fecha_actualizacion: ISODate("2025-02-06T10:15:00Z")
  }
]);


// =================================================
//   CRUD COMPLETO
// =================================================

// CREATE – insertar producto
db.productos.insertOne({
  nombre: "Audífonos Bluetooth ZH",
  categoria: "Audio",
  marca: "SoundBeat",
  precio: 190000,
  stock: 40,
  rating_promedio: 4.3,
  fecha_creacion: new Date()
});

// READ – usuarios activos
db.usuarios.find({ estado: "activo" });

// UPDATE – aumentar stock
db.productos.updateOne(
  { nombre: "Mouse Inalámbrico Pro" },
  { $inc: { stock: 10 } }
);

// DELETE – eliminar usuario inactivo
db.usuarios.deleteOne({ correo: "carlos.ruiz@example.com", estado: "inactivo" });


// =================================================
//   CONSULTAS CON FILTROS
// =================================================

// Productos entre 100k y 2M
db.productos.find({
  precio: { $gte: 100000, $lte: 2000000 }
});

// Usuarios activos en Bogotá
db.usuarios.find({
  estado: "activo",
  "direccion.ciudad": "Bogotá"
});

// Pedidos entregados y de alto valor
db.pedidos.find({
  estado: "entregado",
  total: { $gt: 500000 }
});


// =================================================
//   CONSULTAS DE AGREGACIÓN
// =================================================

// 1. Productos más vendidos
db.pedidos.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.producto",
      total_vendido: { $sum: "$items.cantidad" }
    }
  },
  { $sort: { total_vendido: -1 } },
  { $limit: 5 }
]);

// 2. Ingresos totales por usuario
db.pedidos.aggregate([
  {
    $group: {
      _id: "$id_usuario",
      total_compras: { $sum: "$total" },
      numero_pedidos: { $count: {} }
    }
  },
  { $sort: { total_compras: -1 } }
]);

// 3. Ingresos mensuales
db.pedidos.aggregate([
  {
    $group: {
      _id: {
        mes: { $month: "$fecha_pedido" },
        anio: { $year: "$fecha_pedido" }
      },
      ingresos_mensuales: { $sum: "$total" },
      cantidad_pedidos: { $count: {} }
    }
  },
  { $sort: { "_id.anio": 1, "_id.mes": 1 } }
]);

// 4. Ingresos por estado de pedido
db.pedidos.aggregate([
  {
    $group: {
      _id: "$estado",
      total_por_estado: { $sum: "$total" },
      cantidad_pedidos: { $count: {} }
    }
  },
  { $sort: { total_por_estado: -1 } }
]);

// 5. Cantidad de productos en el carrito
db.carrito.aggregate([
  { $unwind: "$productos" },
  {
    $group: {
      _id: "$id_usuario",
      total_items_carrito: { $sum: "$productos.cantidad" }
    }
  },
  { $sort: { total_items_carrito: -1 } }
]);

