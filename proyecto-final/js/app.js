// ==========================================
// TIENDA DE PRODUCTOS - JAVASCRIPT
// ==========================================
// Conceptos utilizados:
// - Arrays de objetos
// - Variables let y const
// - Funciones (arrow functions, callbacks)
// - Array methods: filter, map, reduce, forEach, some
// - DOM: createElement, querySelector, appendChild, innerHTML
// - classList: add, remove, contains, toggle
// - Eventos: click, input, DOMContentLoaded
// - JSON: estructura de datos
// - DocumentFragment para rendimiento

// ==========================================
// DATOS (estructura JSON)
// ==========================================
const productos = [
    { id: 1, nombre: "Auriculares Bluetooth", precio: 49.99, categoria: "electronica", img: "https://via.placeholder.com/200x200?text=Auriculares" },
    { id: 2, nombre: "Camiseta Algodón", precio: 19.99, categoria: "ropa", img: "https://via.placeholder.com/200x200?text=Camiseta" },
    { id: 3, nombre: "Libro de JavaScript", precio: 24.99, categoria: "libros", img: "https://via.placeholder.com/200x200?text=Libro+JS" },
    { id: 4, nombre: "Cable USB-C", precio: 9.99, categoria: "electronica", img: "https://via.placeholder.com/200x200?text=Cable+USB" },
    { id: 5, nombre: "Pantalón Slim", precio: 34.99, categoria: "ropa", img: "https://via.placeholder.com/200x200?text=Pantalón" },
    { id: 6, nombre: "Novela Gráfica", precio: 14.99, categoria: "libros", img: "https://via.placeholder.com/200x200?text=Novela" },
    { id: 7, nombre: "Ratón Inalámbrico", precio: 29.99, categoria: "electronica", img: "https://via.placeholder.com/200x200?text=Ratón" },
    { id: 8, nombre: "Sudadera Hoodie", precio: 39.99, categoria: "ropa", img: "https://via.placeholder.com/200x200?text=Sudadera" },
    { id: 9, nombre: "Funda Tablet", precio: 15.99, categoria: "electronica", img: "https://via.placeholder.com/200x200?text=Funda" },
    { id: 10, nombre: "Cuaderno Cuadriculado", precio: 5.99, categoria: "libros", img: "https://via.placeholder.com/200x200?text=Cuaderno" },
    { id: 11, nombre: "Auriculares Gaming", precio: 79.99, categoria: "electronica", img: "https://via.placeholder.com/200x200?text=Gaming" },
    { id: 12, nombre: "Zapatillas Deportivas", precio: 59.99, categoria: "ropa", img: "https://via.placeholder.com/200x200?text=Zapatillas" }
];

// ==========================================
// CARRITO (array de objetos)
// ==========================================
let carrito = [];

// ==========================================
// REFERENCIAS AL DOM
// ==========================================
const listaProductos = document.querySelector('#lista-productos');
const buscarInput = document.querySelector('#buscar');
const contadorCarrito = document.querySelector('#contador-carrito');
const totalCarrito = document.querySelector('#total-carrito');
const botonesCategoria = document.querySelectorAll('#categorias button');

// ==========================================
// FUNCIÓN: Actualizar carrito en el DOM
// ==========================================
function actualizarCarrito() {
    contadorCarrito.textContent = carrito.length;

    const total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalCarrito.textContent = total.toFixed(2) + '€';
}

// ==========================================
// FUNCIÓN: Añadir al carrito
// ==========================================
function anyadirAlCarrito(producto) {
    // Verificar si ya está en el carrito
    const enCarrito = carrito.some(item => item.id === producto.id);
    if (enCarrito) return;

    carrito.push(producto);
    actualizarCarrito();

    // Animación simple
    const btn = document.querySelector(`button[data-id="${producto.id}"]`);
    if (btn) {
        btn.textContent = '✓ En carrito';
        btn.disabled = true;
        btn.style.backgroundColor = '#27ae60';
    }
}

// ==========================================
// FUNCIÓN: Filtrar productos
// ==========================================
function filtrarProductos() {
    const textoBusqueda = buscarInput.value.toLowerCase().trim();
    const botonActivo = document.querySelector('#categorias button.activo');
    const categoria = botonActivo ? botonActivo.dataset.categoria : 'todos';

    return productos.filter(producto => {
        const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
        return coincideBusqueda && coincideCategoria;
    });
}

// ==========================================
// FUNCIÓN: Renderizar productos
// ==========================================
function renderizarProductos(productosParaMostrar) {
    // Limpiar lista
    listaProductos.innerHTML = '';

    // Usar DocumentFragment para rendimiento
    const fragmento = document.createDocumentFragment();

    productosParaMostrar.forEach(producto => {
        // Crear tarjeta
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-producto';

        // Verificar si está en el carrito
        const enCarrito = carrito.some(item => item.id === producto.id);

        tarjeta.innerHTML = `
            <span class="categoria-tag">${producto.categoria}</span>
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}€</p>
            <button data-id="${producto.id}" ${enCarrito ? 'disabled' : ''}>
                ${enCarrito ? '✓ En carrito' : 'Añadir al carrito'}
            </button>
        `;

        // Evento del botón
        const boton = tarjeta.querySelector('button');
        boton.addEventListener('click', () => {
            anyadirAlCarrito(producto);
        });

        fragmento.appendChild(tarjeta);
    });

    listaProductos.appendChild(fragmento);
}

// ==========================================
// EVENTOS: Búsqueda en tiempo real
// ==========================================
buscarInput.addEventListener('input', () => {
    renderizarProductos(filtrarProductos());
});

// ==========================================
// EVENTOS: Filtro por categoría
// ==========================================
botonesCategoria.forEach(boton => {
    boton.addEventListener('click', () => {
        // Quitar clase activo de todos (classList)
        botonesCategoria.forEach(b => b.classList.remove('activo'));
        // Activar el clickeado
        boton.classList.add('activo');
        // Re-renderizar
        renderizarProductos(filtrarProductos());
    });
});

// ==========================================
// INIT: Cargar página
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Activar "Todos" por defecto
    document.querySelector('#categorias button[data-categoria="todos"]').classList.add('activo');
    renderizarProductos(productos);
    actualizarCarrito();
});
