//Importamos navbar y footer components
import { navBarComponent } from "./components/navbar.component.js";
import { footerComponent } from "./components/footer.component.js";
import { cardComponent } from "./components/cards.component.js";
import { getUserData, Logout, getCarrito } from "./utils/SessionStorageController.js";
import { AgregarProductoCarrito, IncrementarProductoCantidad, RestarProductoCantidad } from "./utils/CarritoController.js";

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
function renderizarCards() {
    const cardContainer = document.getElementById('cardContainer');
    if (!cardContainer) return; // si no esta el contenedor, salimos

    cardContainer.innerHTML = products.map(p =>
        cardComponent(p.img, p.title, p.description, p.price, p.quantity)
    ).join('');
}




let carrito = [];
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



