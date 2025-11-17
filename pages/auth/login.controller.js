
import { setUserData, getUserData } from '../../utils/SessionStorageController.js';
import { MsgAlerta } from '../../utils/AlertController.js';


let cuentas = [];
//Usuarios de prueba para login
// --- Carga del JSON de forma asincrona ---
async function cargarUsuario() {
    try {
        const res = await fetch('/api/accounts.json');
        const data = await res.json();
        console.log("Data:", data);
        cuentas = data;

    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}



window.addEventListener('load', async() => {
    await cargarUsuario(); //Cargamos usuarios

    //Buscamos el boton del formulario de login
    let loginForm = document.getElementById('loginForm');

    if (getUserData('UserData')) {
        //Si ya hay un usuario logueado, lo redirigimos al index.html
        window.location.href = "/index.html";
    }
});

//Al hacer click en el boton de login
loginForm.addEventListener('submit', function (event) {

    event.preventDefault(); // Evita el envio del formulario por defecto

    let usuario = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    console.log("Usuario que intenta iniciar sesion: " + usuario);
    console.log("Contraseña del usuario: " + password);



    cuentas.forEach(user => {
     //   console.log(cuentas)
        if (user.email === usuario && user.password === password) {
          //  alert("Inicio de sesion exitoso para el usuario: " + usuario);
            MsgAlerta('LOGIN_EXITOSO');

            //Guardamos la sesion del usuario en sessionStorage, enviamos la KEY los VALUE con datos del usuario
            setUserData('UserData', { email: user.email, name: user.nombre, apellido: user.apellido, fechaNacimiento: user.fechaNacimiento, domicilio: user.domicilio });
            
            //redirigimos al usuario al index.html
            window.location.href = "/index.html";

        }
        else {
         //   alert("No se pudo iniciar sesion. Usuario o contraseña incorrectos.");
            MsgAlerta('LOGIN_ERRONEO');
        }
    });

});






