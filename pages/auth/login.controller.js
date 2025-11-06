
import { setUserData, getUserData } from '../../utils/SessionStorageController.js';


//Usuarios de prueba para login
const usuariosPrueba = [
    {
        email: 'test@test.com',
        nombre: "TestUser",
        apellido: "Apellido",
        fechaNacimiento: "2025-11-01",
        domicilio: "Calle Falsa 123",
        password: 'password123'
    },
]



window.addEventListener('load', () => {
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



    usuariosPrueba.forEach(user => {
        if (user.email === usuario && user.password === password) {

            alert("Inicio de sesión exitoso para el usuario: " + usuario);

            //Guardamos la sesion del usuario en sessionStorage, enviamos la KEY los VALUE con datos del usuario
            setUserData('UserData', { email: user.email, name:user.nombre, apellido:user.apellido, fechaNacimiento:user.fechaNacimiento, domicilio:user.domicilio });


            //redirigimos al usuario al index.html
            window.location.href = "/index.html";

        }
        else {
            alert("No se pudo iniciar sesión. Usuario o contraseña incorrectos.");
        }
    });

});






