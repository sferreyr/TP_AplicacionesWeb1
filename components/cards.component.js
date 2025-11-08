



import { getUserData } from "../utils/SessionStorageController.js";


export const cardComponent = (img, title, description, price, quantity) => {

let isNuevo = false; //Variable para definir si el producto es nuevo

//variable para chequear inicio de sesion
let isloggedIn = false;

let emailUser = "";

if (getUserData('UserData')) {
    console.log("Usuario logueado: " + getUserData('UserData').email);
    emailUser = getUserData('UserData').email;

    isloggedIn = true;
}


// Marcamos juguetes como nuevos
if (title == 'Juguete Perro' || title == 'Juguete Gato') {
    isNuevo = true;
}

    return `
                    <div class="col">
                    <div class="card h-100 text-center shadow border position-relative">

                    ${ isNuevo ? `
                        <span class="badge text-bg-primary text-warning"
                            style="position:absolute; margin-top:5px; margin-left: 5px">Nuevo</span>
                        ` : '' }


                        <img src="${img}" alt="Producto 1" class="card-img-top img-fluid p-3"
                            style="height:200px; object-fit:contain;">
                        <div class="card-body">
                            <h5 class="card-title text-success" style="font-weight:bold">${title}</h5>
                            <p class="card-text text-secondary descripcion">${description}</p>
                            <p class="card-text precio">${price}</p>

                              ${isloggedIn ? `
                            <div class="d-flex justify-content-between mb-3">
                                <button class="btn btn-outline-secondary btn-sm btn_restar">-</button>
                                <span class="align-self-center quantity">${quantity}</span>
                                <button class="btn btn-outline-secondary btn-sm btn_sumar">+</button>
                            </div>
                               
                            <button class="btn btn-outline-info w-100 mt-auto mb-2 btnAgregarCarrito">Añadir al
                                carrito</button>

                            <button id="btnComprarAhora" class="btn btn-outline-info w-100 mt-auto">Comprar
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