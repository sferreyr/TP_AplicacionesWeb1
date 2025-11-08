import { setUserData, getUserData } from '../../utils/SessionStorageController.js';
import { MsgAlerta } from '../../utils/AlertController.js';



window.addEventListener('load', () => {
    //Buscamos el boton del formulario de register
    let registerForm = document.getElementById('registerForm');

        if (getUserData('UserData')) {
        //Si ya hay un usuario logueado, lo redirigimos al index.html
        window.location.href = "/index.html";
    }
});

//Al hacer click en el boton de register
registerForm.addEventListener('submit', function (event) {

    event.preventDefault(); // Evita el envio del formulario por defecto

    let frmEmail = document.getElementById('email').value;
    let frmPassword = document.getElementById('password').value;
    let frmNombre = document.getElementById('nombre').value;
    let frmApellido = document.getElementById('apellido').value;
    let frmFechaNacimiento = document.getElementById('fechaNacimiento').value;
    let frmDomicilio = document.getElementById('domicilio').value;

    

    //Guardamos la sesion del usuario en sessionStorage, enviamos la KEY los VALUE con datos del usuario
    setUserData('UserData', { email: frmEmail, name: frmNombre, apellido: frmApellido, fechaNacimiento: frmFechaNacimiento, domicilio: frmDomicilio });


        //alert("Cuenta creada correctamente, seras redirigido al inicio ");
     MsgAlerta('REGISTRO_EXITOSO', 'Cuenta creada correctamente, seras redirigido al inicio ');

    //redirigimos al usuario al index.html
    window.location.href = "/index.html";


});



