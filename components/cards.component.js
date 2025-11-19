



import { getUserData, getCarrito } from "../utils/SessionStorageController.js";


//creamos la variable del carrito, si no hay nada dejamos vacio.
let carrito = getCarrito() || [];

// variable cantidad de cada producto del carrito
let cantidadCarrito = 0;


export const cardComponent = (img, nuevo, title, description, price, quantity) => {
    let isNuevo = false; //Variable para definir si el producto es nuevo

    if (nuevo == 'si') {
        isNuevo = true;
    } else {
        isNuevo = false;
    }

    //variable para chequear inicio de sesion
    let isloggedIn = false;

    let emailUser = "";

    if (getUserData('UserData')) {
        // console.log("Usuario logueado: " + getUserData('UserData').email);
        emailUser = getUserData('UserData').email;

        isloggedIn = true;
    }

    //Obtenemos cantidad de productos en el carrito para cada card
    const enCarrito = carrito.find(p => p.title === title);
    if (enCarrito) {
        cantidadCarrito = enCarrito.quantity;
    } else {
        cantidadCarrito = 0
    }



    return `
                    <div class="col">
                    <div class="card h-100 text-center  shadow border position-relative d-flex">

                    ${isNuevo ? `
                        <span class="badge text-bg-primary text-warning"
                            style="position:absolute; margin-top:5px; margin-left: 5px">Nuevo</span>
                        ` : ''}


                        <img src="${img}" alt="Producto 1" class="card-img-top img-fluid p-3"
                            style="height:200px; object-fit:contain;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-success mt-auto" style="font-weight:bold">${title}</h5>
                            <p class=" text-secondary descripcion mb-4 mt-auto">${description}</p>
                            <p class=" text-center precio mt-auto bg-primary-subtle text-primary fw-bold rounded shadow-sm">${price}</p>

                        </div>
                        <div class="card-footer rounded" style="background-color: #dcf9ff;">
                           ${isloggedIn ? `
                            <div class="d-flex justify-content-between mb-3">
                                <button class="btn btn-outline-secondary btn-sm btn_restar">-</button>
                                <span class="align-self-center quantity">${cantidadCarrito}</span>
                                <button class="btn btn-outline-secondary btn-sm btn_sumar">+</button>
                            </div>
                               
                            <button class="btn btn-outline-info w-100 mt-auto mb-2 btnAgregarCarrito">Añadir al
                                carrito</button>

                            <button class="btn btn-outline-info w-100 mt-auto btnComprarAhora">Comprar
                                ahora</button>

                                 `: `

                                
                                    <a href="/pages/auth/login.html" class="text-decoration-none">
                                    <button class="btn btn-outline-info w-100 mt-auto mb-2 btnAgregarCarrito">
                                        Añadir al carrito
                                    </button>
                                    </a>

                                    <a href="/pages/auth/login.html" class="text-decoration-none">
                                    <button id="btnComprarAhora" class="btn btn-outline-info w-100 mt-auto">
                                        Comprar ahora
                                    </button>
                                    </a>

                                 ` }
                        </div>
                    </div>
                </div>
    
    `



}