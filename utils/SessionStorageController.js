
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
            //Guardamos la sesion del usuario en sessionStorage
        sessionStorage.setItem(key, JSON.stringify(value));
}


export const setCarrito = (key, value) =>
{
              //Guardamos el carrito elegido en sessionStorage
        sessionStorage.setItem(key, JSON.stringify(value));
}



export const getCarrito = () =>
{
        //Obtenemos el carrito elegido en sessionStorage
    return JSON.parse(sessionStorage.getItem('Carrito'));
}



