// declarar un array para almacenar productos
let productos = [
    { nombre: "Smartphone", precio: 500000, stock: 5 },
    { nombre: "Laptop", precio: 800000, stock: 3 },
    { nombre: "Smart TV", precio: 450000, stock: 6 }
];
// Función para agregar un producto al registro
function agregarProducto() {
    let nombre = document.getElementById("nombre").value.trim();
    let precio = parseFloat(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value);

    // Validar que todos los campos estén completos
    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Crear un objeto producto
    let nuevoProducto = { nombre, precio, stock };

    // Agregar el producto al array
    productos.push(nuevoProducto);

    alert("Producto agregado con éxito.");
}

// Función para buscar un producto por nombre
function buscarProducto() {
    let nombreBuscado = document.getElementById("nombreBusqueda").value.toLowerCase();

    // Utilizar el método find para buscar el producto por nombre
    let productoEncontrado = productos.find(function(producto) {
        return producto.nombre.toLowerCase() === nombreBuscado;
    });

    if (productoEncontrado) {
        alert("Producto encontrado:\nNombre: " + productoEncontrado.nombre + "\nPrecio: " + productoEncontrado.precio + "\nStock: " + productoEncontrado.stock);
    } else {
        alert("Producto no encontrado.");
    }
}

// Función para mostrar todos los productos
function mostrarProductos() {
    if (productos.length > 0) {
        let listaProductos = "Listado de productos:\n";
        productos.forEach(function(producto, index) {
            listaProductos += (index + 1) + ". " + producto.nombre + "\n";
        });
        alert(listaProductos);
    } else {
        alert("No hay productos en el registro.");
    }
}

// Función principal que se ejecuta al hacer clic en el botón
function ejecutarAccion() {
    let opcion = document.getElementById("opcion").value;

    switch (opcion) {
        case "agregar":
            agregarProducto();
            break;
        case "buscar":
            buscarProducto();
            break;
        case "mostrar":
            mostrarProductos();
            break;
        case "salir":
            alert("¡Hasta luego!");
            // No es necesario hacer nada más, ya que el bucle se romperá en la próxima iteración.
            break;
        default:
            alert("Opción no válida. Por favor, elija una opción correcta.");
    }

    // Limpiar campos después de ejecutar la acción
    limpiarCampos();
}

// Función para limpiar los campos del formulario
function limpiarCampos() {
    // Limpiar campos de entrada
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("nombreBusqueda").value = "";

    // Ocultar campos según la opción seleccionada
    document.getElementById("camposAgregar").style.display = "none";
    document.getElementById("camposBuscar").style.display = "none";
}

// Función para mostrar u ocultar campos según la opción seleccionada
function mostrarCampos(opcion) {
    // Mostrar campos según la opción seleccionada
    document.getElementById("camposAgregar").style.display = opcion === "agregar" ? "block" : "none";
    document.getElementById("camposBuscar").style.display = opcion === "buscar" ? "block" : "none";
}

// Asignar el evento onchange para mostrar/ocultar campos según la opción seleccionada
document.getElementById("opcion").addEventListener("change", function() {
    mostrarCampos(this.value);
});

// Asignar el evento clic al botón usando addEventListener
document.getElementById("botonEjecutar").addEventListener("click", ejecutarAccion);