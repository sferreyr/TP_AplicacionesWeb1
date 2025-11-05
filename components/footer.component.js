

const footer = `
        <div class="container">
            <div class="row text-center text-md-start">

                <div class="col-md-3 mb-3">
                    <a href="/index.html"> <img src="/logo.png" class="img-fluid footer-logo" alt="Logo"> </a>
                    <p class="text-muted small">Todo para tu mascota en un solo lugar.</p>
                </div>


                <div class="col-md-3 mb-3">
                    <h6 class="fw-bold">Inicio</h6>
                    <ul class="nav flex-column">
                        <li class="nav-item"><a href="/index.html" class="nav-link px-0 text-muted">Inicio</a></li>
                        <li class="nav-item"><a href="/pages/sobrenosotros.html" class="nav-link px-0 text-muted">Sobre
                                nosotros</a></li>
                        <li class="nav-item"><a href="/pages/contacto.html"
                                class="nav-link px-0 text-muted">Contactanos</a></li>
                    </ul>
                </div>

                <div class="col-md-3 mb-3">
                    <h6 class="fw-bold">Productos</h6>
                    <ul class="nav flex-column">
                        <li class="nav-item"><a href="/pages/productos/alimentos.html"
                                class="nav-link px-0 text-muted">Alimentos</a></li>
                        <li class="nav-item"><a href="/pages/productos/juguetes.html"
                                class="nav-link px-0 text-muted">Juguetes</a></li>
                        <li class="nav-item"><a href="/pages/productos/accesorios.html"
                                class="nav-link px-0 text-muted">Accesorios</a></li>
                    </ul>
                </div>


                <div class="col-md-3 mb-3">
                    <h6 class="fw-bold">Servicios</h6>
                    <ul class="nav flex-column">
                        <li class="nav-item"><a href="/pages/servicios/peluqueria.html"
                                class="nav-link px-0 text-muted">Peluqueria</a></li>
                        <li class="nav-item"><a href="/pages/servicios/paseos.html"
                                class="nav-link px-0 text-muted">Paseos</a></li>
                        <li class="nav-item"><a href="/pages/servicios/cuidados.html"
                                class="nav-link px-0 text-muted">Cuidados</a></li>
                    </ul>
                </div>
            </div>
            <div class="text-center mt-3">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Mercado_Pago.svg" alt="Mercado Pago"
                    height="64" class="mx-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard"
                    height="32" class="mx-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" height="32"
                    class="mx-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" height="32"
                    class="mx-2">
            </div>

            <hr class="border-success opacity-50">
            <p class="text-center text-muted mb-0">© 2025 La Tienda de Mishi</p>
        </div>



`
let footerContainer = document.querySelector('footer');


window.addEventListener('load', () => {
    footerContainer.innerHTML = footer; // remplaza footer
});