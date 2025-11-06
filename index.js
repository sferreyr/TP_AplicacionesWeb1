//Importamos navbar y footer components
import { navBarComponent } from "./components/navbar.component.js";
import { footerComponent } from "./components/footer.component.js";
import { cardComponent } from "./components/cards.component.js";



let navContainer = document.querySelector('header');
let footerContainer = document.querySelector('footer');


window.addEventListener('load', () => {
    let pageName = document.getElementById('pageName').value; // obtenemos el valor de la pagina actual



    if (navContainer) { // Si existe header

        navContainer.innerHTML = navBarComponent; // remplaza dentro del header el navBar
    }

    if (footerContainer) { //  Si existe footer

        footerContainer.innerHTML = footerComponent; // remplaza footer
    }

    //Si la pagina es index.html cargamos las cards de productos
    if (pageName === 'Inicio') {

        let cardContainer = document.getElementById('cardContainer');

const products = [
    { img: './assets/img/alimentoperro.webp', title: 'Alimento para Perros', description: 'Alimento balanceado para perros de todas las edades.', price: '$20.00' },
    { img: './assets/img/juguete_perro.webp', title: 'Juguete Perro', description: 'Juguete de perro Dental Rellenable 9,5 X 5cm.', price: '$250.00' },
    { img: './assets/img/hierbagatera.png', title: 'Juguete Gato', description: 'Juguete Para Gato con Hierba Gatera.', price: '$210.00' },
    { img: './assets/img/alimentogato.webp', title: 'Alimento para Gatos Excellent', description: 'Alimento balanceado para gatos adultos 15Kg', price: '$200.00' }
];


        cardContainer.innerHTML = products.map(p =>
            cardComponent(p.img, p.title, p.description, p.price)
        ).join('');

    };
}

);
