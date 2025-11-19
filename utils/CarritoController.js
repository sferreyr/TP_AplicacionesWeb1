import { cardComponent } from "../components/cards.component.js";
import { setCarrito, getCarrito, getCarritoCount } from "./SessionStorageController.js";
import { MsgAlerta } from './AlertController.js';

//creamos la variable del carrito, si no hay nada dejamos vacio.
let carrito = getCarrito() || [];



//funcion para actualizar
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
      setCarrito(carrito); // Actualizamos el carrito en sessionStorage
    });
  }
  setCarrito(carrito);
  actualizarBadgeCarrito();
}

//funcion para incrementar haciendo click en btn_sumar
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
        producto.quantity += 1;
        carrito.push(producto); // agregamos el producto al carrito

        actualizarBadgeCarrito();
      }
      MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);
      setCarrito(carrito); // Actualizamos el carrito en sessionStorage
      actualizarBadgeCarrito();
    });
  }
};

//funcion para restar haciendo click en btn_restar
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
      setCarrito(carrito); // Actualizamos el carrito en sessionStorage
      actualizarBadgeCarrito();
    });
    setCarrito(carrito);
  }
  actualizarBadgeCarrito();
}


//funcion para agregar productos "comprar ahora" haciendo click 
export const AgregarProductoCarrito = (productos) => {

  // Obtenemos todos los botones "Agregar al carrito"
  const botones = document.getElementsByClassName('btnAgregarCarrito');


  // Obtenemos todos los botones "Comprar ahora"
  const botonesComprarAhora = document.getElementsByClassName('btnComprarAhora');


  //Iteramos sobre los botones y les agregamos el evento click - botones AgregarCarrito
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
        setCarrito(carrito); // Actualizamos el carrito en sessionStorage
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
          setCarrito(carrito); // Actualizamos el carrito en sessionStorage
          MsgAlerta('PRODUCTO_AGREGADO', producto.title);
          actualizarBadgeCarrito();
        }
      }
      setCarrito(carrito); // 
      //console.log('Carrito actual:', carrito);
      actualizarBadgeCarrito();
    });
  }


  //Iteramos sobre los botones y les agregamos el evento click - botones ComprarAhora
  for (let i = 0; i < botonesComprarAhora.length; i++) {
    botonesComprarAhora[i].addEventListener('click', () => {
      const producto = productos[i];
      //    console.log('El producto', producto);
      //  const productoCantidad = document.getElementsByClassName('quantity');

      // Si el carrito esta vacio
      if (carrito.length === 0) {
        producto.quantity = 1; // asignamos 1 y enviamos al usuario al carrito

        carrito.push(producto); // añadimos el producto al carrito
        MsgAlerta('PRODUCTO_AGREGADO', producto.title);

        //Renviamos al carrito al usuario previantemente incrementando su cantidad.
        window.location.href = "/pages/carrito.html";


      } else { // SI EL CARRITO TIENE CONTENIDO.

        let existe = false; // variable para comprobar si existe el producto en el carrito

        // Recorremos el carrito
        carrito.forEach(e => {
          if (e.title === producto.title) {
            //    console.log('PRODUCTO EXISTENTE EN CARRITO');
            e.quantity += 1; //sumamos 1 a la cantidad del producto en el carrito
            MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);
            existe = true;
          }
        });
        setCarrito(carrito); // Actualizamos el carrito en sessionStorage
        actualizarBadgeCarrito();

        // Si no estaba en el carrito, lo agregamos
        if (!existe) {
          producto.quantity = 1; // asignamos 1 y directmanete llevamos al usuario al carrito
          carrito.push(producto); // agregamos el producto al carrito
        }
      }
      setCarrito(carrito); // 
      // console.log('Carrito actual:', carrito);
      actualizarBadgeCarrito();
      //Renviamos al carrito al usuario previantemente incrementando su cantidad.
      window.location.href = "/pages/carrito.html";
    });
  }
};


//Actualizamos badge carrito
function actualizarBadgeCarrito() {
  const cantidad = getCarritoCount();
  const badge = document.getElementById("carritoCantidadBadge");

  // console.log("BADGE ACTUALIZADO");
  if (!badge) return; // Si no existe badge en el html salimos
  badge.textContent = cantidad; // seteamos la cantidad obtenida del total del carrito
}



//funcion para incrementar haciendo click en btn_sumar en CARRITO
export const IncProductoCantidadCarrito = (productos) => {
  // Obtenemos todos los botones "+" de las cards
  const botones = document.getElementsByClassName('btn_sumar');

  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      carrito = getCarrito() || [];

      let producto = productos[i];
            let productosTotal = 0;

      const cantidadElemento = document.getElementsByClassName('quantity');
      const htmlPrecioUnidad = document.getElementsByClassName("price");
      const htmlTotal = document.getElementsByClassName("total"); // total de cada producto
      const htmlFinalTotal = document.getElementById("finalTotal");
       const htmlProductosFinal = document.getElementById("finalProductos");

      let quantity = parseInt(cantidadElemento[i].innerText);

      let precioUnidad = parseFloat(htmlPrecioUnidad[i].innerText.toString().replace('$', '')) || 0;

      quantity += 1; // incrementamos la cantidad en 1.

      //Actualizamos Interfaz
      cantidadElemento[i].innerText = quantity;
      htmlTotal[i].innerText = "$" + (precioUnidad * quantity);

      //Funcion para incrementar el FINAL TOTAL de todos los productos (Suma de cada producto en el carrito)
      let suma = 0;
      for (let i = 0; i < htmlTotal.length; i++) {
        const valor = parseFloat(htmlTotal[i].innerText.toString().replace('$', '')) || 0;
        suma += valor; // acumulamos
      }
      if (htmlFinalTotal) { // Si existe en el DOM
        htmlFinalTotal.innerText = suma; //seteamos el valor visualmente
      }

      //Buscamos en el carrito el producto que ya se encuentre y le sumamos 1
      carrito.forEach(e => {
        if (e.title === producto.title) {
          e.quantity += 1; //sumamos 1 a la cantidad del producto en el carrito
          
          //actualizamos frontend o interfaz
          if (cantidadElemento[i]) cantidadElemento[i].innerText = e.quantity;

         // MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);
        }
              productosTotal += e.quantity;
      });

          if (htmlProductosFinal) {
          htmlProductosFinal.innerHTML = productosTotal;
        }

      MsgAlerta('PRODUCTO_INCREMENTADO', producto.title);
      setCarrito(carrito); // Actualizamos el carrito en sessionStorage
      actualizarBadgeCarrito();
    });
  }
};

//funcion para restar haciendo click en btn_restar en CARRITO
export const RestProductoCantidadCarrito = (productos) => {
  const botones = document.getElementsByClassName('btn_restar');

  //Iteramos sobre los botones y les agregamos el evento click
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', () => {
      carrito = getCarrito() || [];

      let producto = productos[i];
      let productosTotal = 0;
      const cantidadElemento = document.getElementsByClassName('quantity');
      const htmlPrecioUnidad = document.getElementsByClassName("price");
      const htmlTotal = document.getElementsByClassName("total"); // total de cada producto
      const htmlFinalTotal = document.getElementById("finalTotal");
      const htmlProductosFinal = document.getElementById("finalProductos");

      let quantity = parseInt(cantidadElemento[i].innerText);
      let precioUnidad = parseFloat(htmlPrecioUnidad[i].innerText.toString().replace('$', '')) || 0;

      if (quantity > 1) {
        quantity -= 1;

        //Actualizamos Interfaz
        cantidadElemento[i].innerText = quantity;
        htmlTotal[i].innerText = "$" + (precioUnidad * quantity);

        //Buscamos en el carrito el producto que ya se encuentre y le restamos 1
        carrito.forEach(e => {
          if (e.title === producto.title) {
            e.quantity -= 1;
          }
          productosTotal += e.quantity;
        });

        let suma = 0;
        for (let j = 0; j < htmlTotal.length; j++) {
          const valor = parseFloat(htmlTotal[j].innerText.toString().replace('$', '')) || 0;
          suma += valor;
        }
        if (htmlFinalTotal) {
          htmlFinalTotal.innerText =  suma;
        }

        if (htmlProductosFinal) {
          htmlProductosFinal.innerHTML = productosTotal;
        }

        MsgAlerta('PRODUCTO_DECREMENTADO', producto.title);
      }
      else // Eliminamos el producto del carrito

      {
        //Buscamos en el carrito todos los productos que no sean iguales al producto a eliminar
        carrito = carrito.filter(e => e.title !== producto.title);

        const fila = botones[i].closest('.trProducto');
        if (fila) fila.remove(); // eliminamos el TR (tablee)

        //calculamos el precio final total de todos los productos
        let suma = 0;
        for (let j = 0; j < htmlTotal.length; j++) {
          const valor = parseFloat(htmlTotal[j].innerText.toString().replace('$', '')) || 0;
          suma += valor;
        }
        if (htmlFinalTotal) {
          htmlFinalTotal.innerText = "$" + suma;
        }

        //calcumaos el total de los productos que quedan(cantidad)
        productosTotal = 0;
        carrito.forEach(e => {
          productosTotal += e.quantity;
        });
        if (htmlProductosFinal) {
          htmlProductosFinal.innerHTML = productosTotal;
        }
        location.reload();// ACTUALIZAMOS LA PAGINA PORQUE SI NO NO SE CARGAN BIEN LOS CLASS [I] y empieza a restar mal

        MsgAlerta('PRODUCTO_ELIMINADO', producto.title);
      }

      setCarrito(carrito);
      actualizarBadgeCarrito();

    });
  }
};
