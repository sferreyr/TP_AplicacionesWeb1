
export const getUserData = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
}

export const Logout = (key) => {
    /*Eliminar la sesion */
    sessionStorage.removeItem(key);
    /* Redirigimos al usuario al home */
    window.location.href = "/index.html";
}


export const setUserData = (key, value) => {
            //Guardamos la sesion del usuario en sessionStorage
        sessionStorage.setItem(key, JSON.stringify(value));
}



