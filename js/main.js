let productos = [
    { nombre: "smartphone", precio: 500000, stock: 5 },
    { nombre: "laptop", precio: 800000, stock: 3 },
    { nombre: "smart TV", precio: 450000, stock: 6 }
];

// Verificar si hay datos en el localStorage al cargar la página
if (localStorage.getItem('productos')) {
    productos = JSON.parse(localStorage.getItem('productos'));
}

// Función para agregar un producto al registro
function agregarProducto() {
    let nombre = document.querySelector("#nombre").value.trim();
    let precio = parseFloat(document.querySelector("#precio").value);
    let stock = parseInt(document.querySelector("#stock").value);

    // Validar que todos los campos estén completos
    if (!nombre || isNaN(precio) || isNaN(stock)) {
        Swal.fire({
            title: 'Error',
            text: 'Complete los campos correctamente',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Crear un objeto producto
        let nuevoProducto = { nombre, precio, stock };

        // Obtener los campos de atributos adicionales
        const atributosContainer = document.getElementById("atributosContainer");
        const camposAtributos = atributosContainer.querySelectorAll("div");

        // Agregar los atributos adicionales al objeto producto
        camposAtributos.forEach(function (atributo) {
            let nombreAtributo = atributo.querySelector("input[name='nombreAtributo']").value.trim();
            let valorAtributo = atributo.querySelector("input[name='valorAtributo']").value.trim();
            if (nombreAtributo && valorAtributo) {
                nuevoProducto[nombreAtributo] = valorAtributo;
            }
        });

        // Agregar el producto al array
        productos.push(nuevoProducto);

        // Almacenar productos en el localStorage
        localStorage.setItem('productos', JSON.stringify(productos));

        // Limpiar formulario y campos de atributos
        document.getElementById("formulario").reset();
        atributosContainer.innerHTML = "";

        Toastify({
            text: `Producto agregado con éxito`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #4d3efc, #4d3efc)",
        }).showToast();
        mostrarProductos(); // Mostrar productos después de agregar uno nuevo
    }



}


// Función para buscar un producto por nombre
function buscarProducto() {
    let nombreBusqueda = document.getElementById("nombreBusqueda").value.trim().toLowerCase();

    if (!nombreBusqueda) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, ingrese un nombre para buscar.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const resultadoBusqueda = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(nombreBusqueda)
    );

    if (resultadoBusqueda.length > 0) {
        // Si se encuentra el producto, mostrar los detalles
        const productoEncontrado = resultadoBusqueda[0];
        const indiceProductoEncontrado = productos.indexOf(productoEncontrado);
        verDetalles(indiceProductoEncontrado); // Pasar el índice del producto, no el objeto
    } else {
        // Mostrar SweetAlert indicando que el producto no existe
        Swal.fire({
            title: 'Producto no encontrado',
            text: 'El producto no existe en el catálogo.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}



// Función para manejar el botón "Añadir Atributo"
document.getElementById("botonAgregarAtributo").addEventListener("click", agregarAtributoEnAgregarProducto);

function agregarAtributoEnAgregarProducto() {
    const atributosContainer = document.getElementById("atributosContainer");

    // Crear un nuevo conjunto de campos para atributos
    const nuevoAtributo = document.createElement("div");
    nuevoAtributo.innerHTML = `
        <label for="nombreAtributo">Nombre del atributo adicional:</label>
        <input type="text" name="nombreAtributo" placeholder="Ej. Descripción">
        <br>
        <label for="valorAtributo">Valor del atributo adicional:</label>
        <input type="text" name="valorAtributo">
        <br>
    `;

    // Agregar el nuevo conjunto de campos al contenedor
    atributosContainer.appendChild(nuevoAtributo);
}

// Función para cambiar el stock de un producto
function cambiarStock(index) {
    const producto = productos[index];

    // Crear un input de tipo number para ingresar el nuevo stock
    Swal.fire({
        title: 'Modificar Stock',
        html: 'Ingrese el nuevo stock:',
        input: 'number',
        inputValue: producto.stock,
        showCancelButton: true,
        inputValidator: (value) => {
            // Validar que el valor ingresado sea un número válido
            if (!value || isNaN(value)) {
                return 'Por favor, ingrese un número válido.';
            }
            // Actualizar el stock y mostrar los productos nuevamente
            productos[index].stock = parseInt(value);
            mostrarProductos();
        }
    });
}

// Función para eliminar un producto
function eliminarProducto(index) {
    Swal.fire({
        title: `¿Seguro que quieres eliminar ${productos[index].nombre}?`,
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            productos.splice(index, 1);
            mostrarProductos();
            Swal.fire(
                'Eliminado',
                'El producto ha sido eliminado.',
                'success'
            );
        }
    });
}

// Función para mostrar tarjetas de productos
function mostrarProductos() {
    const tarjetasProductos = document.getElementById("tarjetasProductos");
    tarjetasProductos.innerHTML = ""; // Limpiar contenido existente

    if (productos.length > 0) {
        productos.forEach(function (producto, index) {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <h6>${producto.nombre}</h6>
                <p>Precio: $${producto.precio}</p>
                <p>Stock: ${producto.stock}</p>
                <div>
                    <button onclick="cambiarStock(${index})">Cambiar Stock</button>
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                    <button onclick="verDetalles(${index})">Ver Detalles</button>
                </div>  
            `;

            tarjetasProductos.appendChild(card);
        });
    } else {
        // Mensaje para indicar que no hay productos
        const mensajeSinProductos = document.createElement("p");
        mensajeSinProductos.innerText = "No hay productos en el catálogo.";
        tarjetasProductos.appendChild(mensajeSinProductos);
    }
    // Almacenar productos en el localStorage después de mostrarlos
    localStorage.setItem('productos', JSON.stringify(productos));
}
// Función para ver detalles del producto
function verDetalles(index) {
    const producto = productos[index];

    // Construir el mensaje con todos los detalles del producto
    let mensaje = `<strong>Nombre:</strong> ${producto.nombre}<br>`;
    mensaje += `<strong>Precio:</strong> $${producto.precio}<br>`;
    mensaje += `<strong>Stock:</strong> ${producto.stock}<br>`;

    // Agregar los detalles de los atributos adicionales
    for (const atributo in producto) {
        if (atributo !== 'nombre' && atributo !== 'precio' && atributo !== 'stock') {
            mensaje += `<strong>${atributo}:</strong> ${producto[atributo]}<br>`;
        }
    }

    // Mostrar SweetAlert con los detalles del producto
    Swal.fire({
        title: 'Detalles del Producto',
        html: mensaje,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
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

    // Obtener la opción seleccionada
    const opcionSeleccionada = document.getElementById("opcion").value;

    // Ocultar campos según la opción seleccionada (excepto para la opción "mostrar")
    if (opcionSeleccionada === "mostrar") {
        document.getElementById("camposAgregar").style.display = "none";
        document.getElementById("camposBuscar").style.display = "none";
    }
}

// Función para mostrar u ocultar campos según la opción seleccionada
function mostrarCampos(opcion) {
    // Mostrar campos según la opción seleccionada
    document.getElementById("camposAgregar").style.display = opcion === "agregar" ? "block" : "none";
    document.getElementById("camposBuscar").style.display = opcion === "buscar" ? "block" : "none";

    // Limpiar campos de atributos cuando no estás en la opción "agregar"
    if (opcion !== "agregar") {
        const atributosContainer = document.getElementById("atributosContainer");
        atributosContainer.innerHTML = "";
    }
}

// Asignar el evento onchange para mostrar/ocultar campos según la opción seleccionada
document.getElementById("opcion").addEventListener("change", function () {
    mostrarCampos(this.value);
});

// Asignar el evento clic al botón usando addEventListener
document.getElementById("botonEjecutar").addEventListener("click", ejecutarAccion);

// Asignar el evento clic al botón "Agregar Atributo"
document.getElementById("botonAgregarAtributo").addEventListener("click", agregarAtributoEnAgregarProducto);

// Asignar el evento clic al botón "Buscar" en la función buscarProducto
document.getElementById("botonBuscar").addEventListener("click", buscarProducto);