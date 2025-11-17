import { cardComponent } from "../components/cards.component.js";
import { setCarrito, getCarrito, getCarritoCount } from "./SessionStorageController.js";
import { MsgAlerta } from './AlertController.js';

//creamos la variable del carrito, si no hay nada dejamos vacio.
let carrito = getCarrito() || [];




export const ActualizarCantidades = (productos) => {
  // Obtenemos todos los botones "+" de las cards
  const botones = document.getElementsByClassName('btnAgregarCarrito');
  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      const producto = productos[i];
      const cantidadElemento = document.getElementsByClassName('quantity');


      let quantity = parseInt(cantidadElemento[i].innerText);
      quantity += 1;
      cantidadElemento[i].innerText = quantity;

      // Recorremos el carrito
      carrito.forEach(e => {
        if (e.title === producto.title) {

          //    console.log('PRODUCTO EXISTENTE EN CARRITO');

          e.quantity += 1; //sumamos 1 a la cantidad del producto en el carrito

          if (cantidadElemento[i]) cantidadElemento[i].innerText = e.quantity;

          MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);


        }
      });
        actualizarBadgeCarrito();
      setCarrito('Carrito', carrito); // Actualizamos el carrito en sessionStorage
    });
  }
  setCarrito('Carrito', carrito);
  actualizarBadgeCarrito();
}


export const IncrementarProductoCantidad = (productos) => {
  // Obtenemos todos los botones "+" de las cards
  const botones = document.getElementsByClassName('btn_sumar');
  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      carrito = getCarrito() || [];
      const producto = productos[i];
      const cantidadElemento = document.getElementsByClassName('quantity');
      let quantity = parseInt(cantidadElemento[i].innerText);
      quantity += 1;
      cantidadElemento[i].innerText = quantity;

      // Recorremos el carrito
      let existe = false;
      carrito.forEach(e => {
        if (e.title === producto.title) {

          //    console.log('PRODUCTO EXISTENTE EN CARRITO');

          e.quantity += 1; //sumamos 1 a la cantidad del producto en el carrito

          if (cantidadElemento[i]) cantidadElemento[i].innerText = e.quantity;

          MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);

          existe = true;
        }
      });

      //si NO existe, se creamos en el carrito
      if (!existe) {
                 carrito.push(producto); // agregamos el producto al carrito
      }

      setCarrito('Carrito', carrito); // Actualizamos el carrito en sessionStorage
      actualizarBadgeCarrito();
    });
  }
};

export const RestarProductoCantidad = (productos) => {
  // Obtenemos todos los botones "+" de las cards
  const botones = document.getElementsByClassName('btn_restar');
  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      const producto = productos[i];
      const cantidadElemento = document.getElementsByClassName('quantity');

      //obtenemos la cantidad actual del producto en la card
      let quantity = parseInt(cantidadElemento[i].innerText);
      if (quantity > 0) {
        //A la cantidad obtenida del card le restamos 1
        quantity -= 1;
        //Actualizamos la cantidad en la card
        cantidadElemento[i].innerText = quantity;

      }

      // Recorremos el carrito
      carrito.forEach(e => {
        if (e.title === producto.title) {
          if (e.quantity > 0) {
            e.quantity -= 1; //restamos 1 a la cantidad del producto en el carrito
            
            cantidadElemento[i].innerText = e.quantity;

            MsgAlerta('PRODUCTO_DECREMENTADO', producto.title);
          }
        }
      });
      setCarrito('Carrito', carrito); // Actualizamos el carrito en sessionStorage
        actualizarBadgeCarrito();
    });
    setCarrito('Carrito', carrito);
  }
  actualizarBadgeCarrito();
}


// Funcion para agregar productos al carrito
export const AgregarProductoCarrito = (productos) => {

  // Obtenemos todos los botones "Agregar al carrito"
  const botones = document.getElementsByClassName('btnAgregarCarrito');

  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      const producto = productos[i];
      //    console.log('El producto', producto);
      const productoCantidad = document.getElementsByClassName('quantity');

      // Si el carrito esta vacio
      if (carrito.length === 0) {
        producto.quantity = productoCantidad[i] ? parseInt(productoCantidad[i].innerText) : 1; // asignamos la cantidad del producto desde la card, si no existe asignamos 1 por defecto

        carrito.push(producto); // añadimos el producto al carrito
        MsgAlerta('PRODUCTO_AGREGADO', producto.title);

      } else {
        let existe = false; // variable para comrpobar si existe el producto en el carrito

        // Recorremos el carrito
        carrito.forEach(e => {
          if (e.title === producto.title) {

            //    console.log('PRODUCTO EXISTENTE EN CARRITO');

            e.quantity += 1; //sumamos 1 a la cantidad del producto en el carrito

            if (productoCantidad[i]) productoCantidad[i].innerText = e.quantity;
            MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);
            existe = true;
          }
        });
        setCarrito('Carrito', carrito); // Actualizamos el carrito en sessionStorage
          actualizarBadgeCarrito();

        // Si no estaba en el carrito, lo agregamos
        if (!existe) {

          let quantity;

          if (productoCantidad[i]) {
            quantity = parseInt(productoCantidad[i].innerText) || 1; // obtenemos la cantidad desde la card, si no es un numero seteamos 1
          } else {
            quantity = 1; // si no existe el elemento, seteamos 1
          }
          producto.quantity = quantity; // asignamos la cantidad obtenida al producto

          if (productoCantidad[i]) productoCantidad[i].innerText = quantity; // actualizamos la cantidad en la card

          carrito.push(producto); // agregamos el producto al carrito
          setCarrito('Carrito', carrito); // Actualizamos el carrito en sessionStorage
          MsgAlerta('PRODUCTO_AGREGADO', producto.title);
            actualizarBadgeCarrito();
        }
      }
      setCarrito('Carrito', carrito); // 
      console.log('Carrito actual:', carrito);
      actualizarBadgeCarrito();
    });
  }
};



function actualizarBadgeCarrito() {
  const cantidad = getCarritoCount();
  const badge = document.getElementById("carritoCantidadBadge");

  console.log("BADGE ACTUALIZADO");
  if (!badge) return; // Si no existe badge en el html salimos
  badge.textContent = cantidad; // seteamos la cantidad obtenida del total del carrito
}









