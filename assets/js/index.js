//Importamos navbar y footer components
import { navBarComponent } from "../../components/navbar.component.js";
import { footerComponent } from "../../components/footer.component.js";
import { cardComponent } from "../../components/cards.component.js";
import { getUserData, Logout, getCarrito, getCarritoCount } from "../../utils/SessionStorageController.js";
import { AgregarProductoCarrito, IncrementarProductoCantidad, RestarProductoCantidad, IncProductoCantidadCarrito, RestProductoCantidadCarrito } from "../../utils/CarritoController.js";
import { MsgAlerta } from '../../utils/AlertController.js';

//variable para productos 
let products = [];

// --- Carga del JSON de forma asincrona ---
async function cargarProductos() {
    try {
        const res = await fetch('/api/data.json');
        const data = await res.json();
        // console.log("Data:", data);
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
        // console.log("Usuario logueado: " + getUserData('UserData').email);
        isloggedIn = true
    }

    if (navContainer) { // Si existe header

        navContainer.innerHTML = navBarComponent; // remplaza dentro del header el navBar
    }

    if (footerContainer) { //  Si existe footer

        footerContainer.innerHTML = footerComponent; // remplaza footer
    }


    switch (pageName) {
        case 'Inicio':
            renderizarCards(pageName);

            break;

        case 'Alimentos':
            renderizarCards(pageName);
            // console.log("Cargando productos de alimentos...");


            break;

        case 'Juguetes':
            renderizarCards(pageName);
            //     console.log(pageName);
            //  console.log("Cargando productos de Juguetes...");


            break;

        case 'Accesorios':
            renderizarCards(pageName);
            //   console.log(pageName);
            //  console.log("Cargando productos de Accesorios...");

            break;

        case 'Busqueda':

            // Obtener palabra buscada del query string
            const params = new URLSearchParams(window.location.search);
            const termino = params.get("busqueda");

            // Mostrar el término en algún elemento del HTML
            // document.getElementById("resultadoBusqueda").innerText = termino;
            document.getElementById("resultadoBusqueda").textContent = termino ?? ""; // Cambiamos el texto por el termino si no queda en blanco

            //    console.log(pageName);
            //    console.log("Cargando productos de busqueda...");

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
            let cuponaplicado = false;
            let cuponValido = "MISHI10";
            let finalTotal = 0;
            let productosTotal = 0
            let htmlCarrito = document.getElementById("carrito");
            let htmlFinalTotal = document.getElementById("finalTotal");
            let htmlProductosFinal = document.getElementById("finalProductos");

            let htmlCuponDescuento = document.getElementById("btnAplicarDescuento");

            // Renderizamos/hacemos aparecer las cards de productos
            htmlCarrito.innerHTML = carrito.map(p => {
                const price = parseFloat(p.price.replace('$', '')) || 0; //convertimos a float o 0, a su vez remplazamos $ por nada(eliminamos el simbolo).
                const qty = parseInt(p.quantity) || 0; // convertimos a Int  o ponemos 0
                const total = price * qty;
                productosTotal += qty;
                finalTotal += total;
                return qty > 0
                    ? `
                        <tr class="trProducto">
                            <td class="td-producto text-center fw-bold">
                                <img src="${p.img}" width="50px" height="50px" /> ${p.title}
                            </td>
                            <td><span class="quantity">${qty}</span></td>
                            <td><span class="price">$${price}</span></td>
                            <td><span class="total">$${total}</span></td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-outline-danger btn_restar">
                                    <i class="fa-solid fa-minus"></i>
                                </button>

                                <button class="btn btn-sm btn-outline-success btn_sumar">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </td>
                        </tr>
                        `
                    : '';
            }).join('');

            htmlFinalTotal.innerHTML = finalTotal;

            htmlProductosFinal.innerHTML = productosTotal;

            // Activamos funcionalidades para incrementar o decrementar productos en el carrrito
            IncProductoCantidadCarrito(carrito);
            RestProductoCantidadCarrito(carrito);


            //Listener para el boton de aplicar descuento
            htmlCuponDescuento.addEventListener('click', () => {

                let htmlCupon = document.getElementById("porcentajeDescuento").value;
                let htmlCuponT = document.getElementById("porcentajeDescuento");

                let codigoAplicado = document.getElementById("codigoAplicado")

                console.log(htmlCupon);

                if (htmlCupon === cuponValido) {
                    let sumaBase = 0;
                    const htmlTotal = document.getElementsByClassName("total");

                    //Itineramos sobre todos los totales de cada producto, le borramos su $, y acumulamos
                    for (let i = 0; i < htmlTotal.length; i++) {
                        const valor = parseFloat(
                            htmlTotal[i].innerText.toString().replace('$', '')
                        ) || 0;
                        sumaBase += valor;
                    }

                    let totalConDescuento = sumaBase - (sumaBase * 10) / 100;


                    MsgAlerta('CUPON_VALIDO');
                    cuponaplicado = true;

                    // aplicamos el descuento y cambiamos visualmente
                    htmlFinalTotal.innerText = totalConDescuento;


                    htmlCuponDescuento.disabled = true; //deshabilitamos el boton
                    htmlCuponT.disabled = true;
                    codigoAplicado.innerHTML = `
                <div class="alert alert-success" role="alert">
                ¡Cupón del 10% aplicado al precio total!
                </div>
                `
                    //Desactivamos botones de incrementar y decrementar productos
                    const botonSumar = document.getElementsByClassName('btn_sumar');
                    //Iteramos sobre los botones y les agregamos el evento click
                    for (let i = 0; i < botonSumar.length; i++) {
                        botonSumar[i].disabled = true;
                    }
                    const botonRestar = document.getElementsByClassName('btn_restar');
                    //Iteramos sobre los botones y les agregamos el evento click
                    for (let i = 0; i < botonRestar.length; i++) {
                        botonRestar[i].disabled = true;
                    }

                } else {
                    MsgAlerta('CUPON_INVALIDO');
                }

            })

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



