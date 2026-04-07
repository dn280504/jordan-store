let pantallaAnterior = "login";

let carrito = [];
let total = 0;
let ventas = 0;
let vendidos = 0;
let productoActual = {};
let productos = [];

// CAMBIO DE PANTALLA
function cambiarPantalla(actual, siguiente) {
    pantallaAnterior = actual;
    document.getElementById(actual).style.display = "none";
    document.getElementById(siguiente).style.display = "block";
}

// REGRESAR
function regresar(actual) {
    document.getElementById(actual).style.display = "none";
    document.getElementById(pantallaAnterior).style.display = "block";
}

// LOGIN
function login() {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("password").value;

    if (pass === "123") {
        if (user === "cliente") {
            cambiarPantalla("login","cliente");
        } else if (user === "empleado") {
            cambiarPantalla("login","empleado");
        } else if (user === "dueno") {
            cambiarPantalla("login","dueno");
        } else {
            alert("Usuario incorrecto");
        }
    } else {
        alert("Contraseña incorrecta");
    }
}

// CARRITO
function agregarCarrito(nombre, precio) {
    carrito.push({nombre, precio});
    total += precio;
    document.getElementById("contador").textContent = carrito.length;
}

function verCarrito() {
    cambiarPantalla("cliente","carrito");

    let lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";

    carrito.forEach((p, i) => {
        let li = document.createElement("li");
        li.innerHTML = p.nombre + " - $" + p.precio +
        ` <button onclick="eliminarProducto(${i})">❌</button>`;
        lista.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

// ELIMINAR
function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    verCarrito();
}

// VACIAR
function vaciarCarrito() {
    carrito = [];
    total = 0;
    verCarrito();
}

// PAGO
function irPago() {
    cambiarPantalla("carrito","pago");
}

function pagar() {
    ventas += total;
    vendidos += carrito.length;

    cambiarPantalla("pago","factura");

    let lista = document.getElementById("facturaLista");
    lista.innerHTML = "";

    carrito.forEach(p => {
        let li = document.createElement("li");
        li.textContent = p.nombre + " - $" + p.precio;
        lista.appendChild(li);
    });

    document.getElementById("facturaTotal").textContent = total;
    document.getElementById("ventas").textContent = ventas;
    document.getElementById("productosVendidos").textContent = vendidos;

    actualizarEstado();

    carrito = [];
    total = 0;
}

// ESTADO DEL NEGOCIO
function actualizarEstado() {
    let estado = document.getElementById("estado");

    if (ventas > 20000) {
        estado.textContent = "🔥 Excelente ventas";
    } else if (ventas > 10000) {
        estado.textContent = "👍 Buen rendimiento";
    } else {
        estado.textContent = "⚠️ Ventas bajas";
    }
}

// DETALLE PRODUCTO
function verProducto(nombre, precio, imagen) {
    cambiarPantalla("cliente","detalle");

    document.getElementById("nombreProducto").textContent = nombre;
    document.getElementById("precioProducto").textContent = precio;
    document.getElementById("imgProducto").src = imagen;

    productoActual = {nombre, precio};
}

function agregarDesdeDetalle() {
    let talla = document.getElementById("talla").value;

    carrito.push({
        nombre: productoActual.nombre + " Talla " + talla,
        precio: productoActual.precio
    });

    total += productoActual.precio;
    document.getElementById("contador").textContent = carrito.length;

    alert("Agregado al carrito 🛒");
}

function comprarDirecto() {
    let talla = document.getElementById("talla").value;

    ventas += productoActual.precio;
    vendidos++;

    alert("Compra realizada: " + productoActual.nombre + " Talla " + talla + " 💳");

    document.getElementById("ventas").textContent = ventas;
    document.getElementById("productosVendidos").textContent = vendidos;

    actualizarEstado();
}

// EMPLEADO
function agregarProducto() {
    let nombre = document.getElementById("nuevoNombre").value;
    let precio = document.getElementById("nuevoPrecio").value;

    productos.push({nombre, precio});

    let li = document.createElement("li");
    li.textContent = nombre + " - $" + precio;

    document.getElementById("listaProductos").appendChild(li);
}

// VOLVER GENERAL
function volver() {
    location.reload();
}