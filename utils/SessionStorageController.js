

/********************************
 *  Funcionamiento Sesion del usuario
 * 
 ********************************/

//Para datos de la session del usuario utilizamos sessionStorage  -  dura solo mientras la pestaña está abierta
export const getUserData = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

//
export const Logout = (key) => {
    /*Eliminar la sesion */
    sessionStorage.removeItem(key);
    /* Redirigimos al usuario al home */
    window.location.href = "/pages/auth/login.html";
}


export const setUserData = (key, value) => {
            //Guardamos la sesion del usuario en sessionstorage
        sessionStorage.setItem(key, JSON.stringify(value));
}


/********************************
 *  Funcionamiento Carrito de compras
 * 
 ********************************/

//Para carrito se utiliza localstorage - dura hasta eliminar
export const setCarrito = (value) =>
{
              //Guardamos el carrito elegido en localStorage
        localStorage.setItem("Carrito", JSON.stringify(value));
}


export const getCarrito = () =>
{
        //Obtenemos el carrito elegido en localstorage, si no hay nada devolvemos vacio
    return  JSON.parse(localStorage.getItem('Carrito') || '[]')
}




export const getCarritoCount = () => {
    
    const carrito = JSON.parse(localStorage.getItem('Carrito')) || []; // obtenemos lo guardado en localstorage, si no tenemos nada dejamos en blanco
    
    let total = 0;
    for (let cant of carrito) {
        total = total + cant.quantity;
    }
  //  console.log("Carrito " + total)
    return total;
}



