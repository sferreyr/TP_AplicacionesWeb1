
let usuarioTest = 'test@test.com';
let passwordTest = 'password123';

//Buscamos el boton del formulario de login
let loginForm = document.getElementById('loginForm');


//Al hacer click en el boton de login
loginForm.addEventListener('submit', function (event) {

    event.preventDefault(); // Evita el envio del formulario por defecto

    let usuario = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    console.log("Usuario que intenta iniciar sesion: " + usuario);
    console.log("Contraseña del usuario: " + password);

    if (usuario === usuarioTest && password === passwordTest) {

        alert("Inicio de sesión exitoso para el usuario: " + usuario);

        //redirigimos al usuario al index.html
        window.location.href = "/index.html";

    }
    else {
        alert("No se pudo iniciar sesión. Usuario o contraseña incorrectos.");
    }

});






