

//Para datos de la session del usuario utilizamos localstorage  - dura para siempre (hasta que el usuario lo borre manualmente)
export const getUserData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

//
export const Logout = (key) => {
    /*Eliminar la sesion */
    localStorage.removeItem(key);
    /* Redirigimos al usuario al home */
    window.location.href = "/pages/auth/login.html";
}


export const setUserData = (key, value) => {
            //Guardamos la sesion del usuario en localStorage
        localStorage.setItem(key, JSON.stringify(value));
}


//Para carrito se utiliza session storage - dura solo mientras la pestaña está abierta
export const setCarrito = (key, value) =>
{
              //Guardamos el carrito elegido en sessionStorage
        sessionStorage.setItem(key, JSON.stringify(value));
}


export const getCarrito = () =>
{
        //Obtenemos el carrito elegido en sessionStorage, si no hay nada devolvemos vacio
    return  JSON.parse(sessionStorage.getItem('Carrito') || '[]')
}




export const getCarritoCount = () => {
    
    const carrito = JSON.parse(sessionStorage.getItem('Carrito')) || []; // obtenemos lo guardado en la session, si no tenemos nada dejamos en blanco
    
    let total = 0;
    for (let cant of carrito) {
        total = total + cant.quantity;
    }
    console.log("Carrito " + total)
    return total;
}



