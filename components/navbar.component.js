
const navElements = [
    { name: 'Inicio', link: '/index.html', icon: 'fa-home' },
    { name: 'Sobre nosotros', link: '/pages/sobrenosotros.html', icon: 'fa-people-group' },
    {
        name: 'Productos', link: '#', icon: 'fa-box-open', dropdown: [
            { name: 'Alimentos', link: '/pages/productos/alimentos.html', icon: 'fa-bowl-food' },
            { name: 'Juguetes', link: '/pages/productos/juguetes.html', icon: 'fa-baseball' },
            { name: 'Accesorios', link: '/pages/productos/accesorios.html', icon: 'fa-bone' }
        ]
    },
    {
        name: 'Servicios', link: '#', icon: 'fa-screwdriver-wrench', dropdown: [
            { name: 'Peluqueria', link: '/pages/servicios/peluqueria.html', icon: 'fa-soap' },
            { name: 'Paseos', link: '/pages/servicios/paseos.html', icon: 'fa-person-walking' },
            { name: 'Cuidado', link: '/pages/servicios/cuidados.html', icon: 'fa-heart' }
        ]
    }
];


let pageName = document.getElementById('pageName').value; // obtenemos el valor de la pagina actual

export const navBarComponent = `

            <a href="index.html"> <img src="/logo.png" height="150px" width="250px" alt="Logo"> </a>
            <br>
            <nav class="navbar navbar-expand-lg  rounded"
                style=" background-color: #ddf1f2; border-bottom: 1px solid #5cc9a3; border-top: 1px solid #5cc9a3;">
                <div class=" container-fluid">
                    <!-- <a class="navbar-brand" href="#">La Tienda de Mishi</a> !-->
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarScroll">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                   
                   
                        ${navElements.map(e => {
                        return `
                                                
                    <li class="nav-item ${e.dropdown ? 'dropdown' : ''}">
                        
                            <a class="nav-link ${pageName == e.name ? 'active' : ''} ${e.dropdown ? 'dropdown-toggle' : ''}" href="${e.link}" ${e.dropdown ? 'data-bs-toggle="dropdown" role="button" aria-expanded="false"' : ''}>      
                            <i class="fa-solid ${e.icon} me-2"></i> ${e.name}
                            </a>
                            ${e.dropdown ? `
                            <ul class="dropdown-menu">
                                ${e.dropdown.map(subItem => `
                                <li>
                                    <a class="dropdown-item" href="${subItem.link}">    
                                    <i class="fa-solid ${subItem.icon} me-2"></i> ${subItem.name}
                                    </a>
                                </li>
                                `).join('')}
                            </ul>
                            ` : ''}
                        </li>
                        `
                    }).join('')
                        }



                        </ul>
                        <form class="d-flex me-3" role="search">
                            <input class="form-control me-2" type="search" placeholder="Buscar productos"
                                aria-label="Buscar">
                            <button class="btn btn-outline-success" type="submit">Buscar</button>
                        </form>

                        <div class="dropdown me-3">
                            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fa-solid fa-user-circle"></i>
                                Mi Cuenta
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="/pages/auth/login.html">
                                        <i class="fa-solid fa-right-to-bracket me-2"></i> Ingresar
                                    </a></li>
                                <li><a class="dropdown-item" href="/pages/signin/registro.html">
                                        <i class="fa-solid fa-user-plus me-2"></i> Registrarse
                                    </a></li>
                            </ul>

                        </div>


                    </div>
            </nav>


`

