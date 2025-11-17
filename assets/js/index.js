//Importamos navbar y footer components
import { navBarComponent } from "../../components/navbar.component.js";
import { footerComponent } from "../../components/footer.component.js";
import { cardComponent } from "../../components/cards.component.js";
import { getUserData, Logout, getCarrito, getCarritoCount } from "../../utils/SessionStorageController.js";
import { AgregarProductoCarrito, IncrementarProductoCantidad, RestarProductoCantidad } from "../../utils/CarritoController.js";

//variable para productos 
let products = [];

// --- Carga del JSON de forma asincrona ---
async function cargarProductos() {
    try {
        const res = await fetch('/api/data.json');
        const data = await res.json();
        console.log("Data:", data);
        products = data;

    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}

// Renderizamos/hacemos aparecer las cards de productos
function renderizarCards(pagina) {
    const cardContainer = document.getElementById('cardContainer');
    if (!cardContainer) return; // si no esta el contenedor, salimos

    if (pagina == 'Inicio') {         /*Dejamos por defecto todas las cards */
        cardContainer.innerHTML = products.map(p =>
            cardComponent(p.img, p.nuevo, p.title, p.description, p.price, p.quantity)
        ).join('');

        // Activar botones "Agregar al carrito"
        AgregarProductoCarrito(products);
        IncrementarProductoCantidad(products);
        RestarProductoCantidad(products);

    } else { //Filtramos por categoria
        //Filtramos solo alimentos que tengan cateogria 'Alimentos'
        const filtro = products.filter(p => p.category === pagina);
        // Renderizamos/hacemos aparecer las cards de productos
        cardContainer.innerHTML = filtro.map(p =>
            cardComponent(p.img, p.nuevo, p.title, p.description, p.price, p.quantity)
        ).join('');

        // Activar botones "Agregar al carrito"
        AgregarProductoCarrito(filtro);
        IncrementarProductoCantidad(filtro);
        RestarProductoCantidad(filtro);



    }

}


//creamos la variable del carrito, si no hay nada dejamos vacio.
let carrito = getCarrito() || [];

//variable para chequear inicio de sesion
let isloggedIn = false;

let navContainer = document.querySelector('header');
let footerContainer = document.querySelector('footer');



window.addEventListener('load', async () => {
    //Cargamos productos desde el JSON
    await cargarProductos();

    let pageName = document.getElementById('pageName').value; // obtenemos el valor de la pagina actual

    //Comprobamos si el usuario esta logueado
    if (getUserData('UserData')) {
        console.log("Usuario logueado: " + getUserData('UserData').email);
        isloggedIn = true
    }

    if (navContainer) { // Si existe header

        navContainer.innerHTML = navBarComponent; // remplaza dentro del header el navBar
    }

    if (footerContainer) { //  Si existe footer

        footerContainer.innerHTML = footerComponent; // remplaza footer
    }

    /*
        //Si la pagina es index.html cargamos las cards de productos
        if (pageName === 'Inicio') {
            renderizarCards();
    
            //Comprobamos carrito en sessionStorage
            const obtenerCarrito = getCarrito();
            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
    
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }
    
            // Activar botones "Agregar al carrito"
            AgregarProductoCarrito(products);
    
            IncrementarProductoCantidad(products);
            RestarProductoCantidad(products);
    
        };
    
    
        //Si la pagina es alimentos.html cargamos las cards de productos
        if (pageName === 'Alimentos') {
    
    
            console.log("Cargando productos de alimentos...");
            let cardContainer = document.getElementById('cardContainer');
            if (!cardContainer) return; // si no esta el contenedor, salimos
    
            //Filtramos solo alimentos que tengan cateogria 'Alimentos'
            const alimentos = products.filter(p => p.category === 'Alimentos');
    
            // Renderizamos/hacemos aparecer las cards de productos
            cardContainer.innerHTML = alimentos.map(p =>
                cardComponent(p.img, p.title, p.description, p.price, p.quantity)
            ).join('');
    
    
            //Comprobamos carrito en sessionStorage
            const obtenerCarrito = getCarrito();
            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }
    
            // Activar botones "Agregar al carrito"
            AgregarProductoCarrito(alimentos);
            IncrementarProductoCantidad(alimentos);
            RestarProductoCantidad(alimentos);
    
        };
    */

    //Comprobamos carrito en sessionStorage
    const obtenerCarrito = getCarrito();

    switch (pageName) {
        case 'Inicio':
            renderizarCards(pageName);

            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }


            break;

        case 'Alimentos':
            renderizarCards(pageName);
            console.log("Cargando productos de alimentos...");

            //Comprobamos carrito en sessionStorage
            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }


            break;

        case 'Juguetes':
            renderizarCards(pageName);
            console.log(pageName);
            console.log("Cargando productos de Juguetes...");
            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }

            break;

        case 'Accesorios':
            renderizarCards(pageName);
            console.log(pageName);
            console.log("Cargando productos de Accesorios...");
            if (obtenerCarrito) {
                //ObtenerCantidadesCarrito(); // Actualizamos las cantidades en la interfaz
                console.log("Carrito cargado desde sessionStorage:", carrito);
            }

            break;

        case 'Busqueda':

            // Obtener palabra buscada del query string
            const params = new URLSearchParams(window.location.search);
            const termino = params.get("busqueda");

            // Mostrar el término en algún elemento del HTML
            // document.getElementById("resultadoBusqueda").innerText = termino;
            document.getElementById("resultadoBusqueda").textContent = termino ?? ""; // Cambiamos el texto por el termino si no queda en blanco

            console.log(pageName);
            console.log("Cargando productos de busqueda...");

            //Filtramos todos los productos que sean iguales al titulo a su vez convertimos a minuscula
            // Filtrar tipo SQL: nombre LIKE '%termino%'
            const filtro = products.filter(p =>
                p.title.toLowerCase().includes(termino)
            );

            // Renderizamos/hacemos aparecer las cards de productos
            cardContainer.innerHTML = filtro.map(p =>
                cardComponent(p.img, p.nuevo, p.title, p.description, p.price, p.quantity)
            ).join('');

            // Activar botones "Agregar al carrito"
            AgregarProductoCarrito(filtro);
            IncrementarProductoCantidad(filtro);
            RestarProductoCantidad(filtro);

            break;

        case 'Carrito':

            let finalTotal = 0;
            let productosTotal = 0
            let htmlCarrito = document.getElementById("carrito");
            let htmlFinalTotal = document.getElementById("finalTotal");
            let htmlProductosFinal = document.getElementById("finalProductos");
            // Renderizamos/hacemos aparecer las cards de productos
            htmlCarrito.innerHTML = carrito.map(p => {
                const price = parseFloat(p.price.replace('$', '')) || 0; //convertimos a float o 0, a su vez remplazamos $ por nada(eliminamos el simbolo).
                const qty = parseInt(p.quantity) || 0; // convertimos a Int  o ponemos 0
                const total = price * qty;
                productosTotal += qty;
                finalTotal += total;
                return `
        <tr>
            <td class=" td-producto text-center fw-bold">
                <img src="${p.img}" width="50px" height="50px" /> ${p.title}
            </td>
            <td>${qty}</td>
            <td>${price}</td>
            <td>${total}</td>
        </tr>
    `
            }).join('');

            htmlFinalTotal.innerHTML = `Total final: $${finalTotal}`;

            htmlProductosFinal.innerHTML = productosTotal;

            console.log(pageName);

            break;



    }


    //Agregar evento al boton de logout si el usuario esta logueado
    if (isloggedIn) {

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Logout('UserData'); //llama a la funcion de logout del SessionStorageController.js para eliminar la sesion y redirigir al home
            });
        }
    }






}

);



