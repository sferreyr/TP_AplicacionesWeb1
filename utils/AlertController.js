




// Definimos los tipos de mensajes para el carrito
const TiposMensaje = {
  //MSG de Login
  LOGIN_EXITOSO: { title: "Notificacion", texto: "Inicio de sesión exitoso", color: "bg-success" },
  LOGIN_ERRONEO: { title: "Notificacion", texto: "No se pudo iniciar sesion. Usuario o contraseña incorrectos.", color: "bg-danger" },
  LOGIN_FALLIDO: { title: "Notificacion", texto: "Error en el inicio de sesión", color: "bg-danger" },

  //MSG de Registro
  REGISTRO_EXITOSO: { title: "Notificacion", texto: "Cuenta creada exitosamente", color: "bg-success" },
  REGISTRO_FALLIDO: { title: "Notificacion", texto: "Error en la creacion de cuenta", color: "bg-danger" },

  //MSG de Carrito
  PRODUCTO_AGREGADO: { title: "Notificacion", texto: "Producto agregado al carrito", color: "bg-success" },
  PRODUCTO_INCREMENTADO: { title: "Notificacion", texto: "Producto incrementado", color: "bg-success" },
  PRODUCTO_DECREMENTADO: { title: "Notificacion", texto: "Producto decrementado", color: "bg-warning" },
  PRODUCTO_ELIMINADO: { title: "Notificacion", texto: "Producto eliminado", color: "bg-danger" },
};



export const MsgAlerta = (tipo, txtadicional) => {
  const { title, texto, color } = TiposMensaje[tipo];


  const Istoast = document.getElementById("liveToast");

  // Si no existe el toast en el HTML, cancelamos
  if (!Istoast) {
    console.error("No se encontró el elemento #liveToast en el HTML.");
  }

  // Cambiamos color de fondo según el tipo de mensaje reemplazando su class
  Istoast.className = `toast align-items-center text-white ${color} border-0`;

  // Actualizamos titulo (header)
  const header = Istoast.querySelector(".toast-header strong");
  if (header) header.textContent = title; //Si existe el header, reemplazamos el titulo


  if (txtadicional) {
    // Actualizamos el body mensaje
    const body = Istoast.querySelector(".toast-body");
    if (body) body.innerHTML = texto + " " + txtadicional; // Si existe el body, reemplazamos el texto

  } else {
    // Actualizamos el body mensaje
    const body = Istoast.querySelector(".toast-body");
    if (body) body.innerHTML = texto; // Si existe el body, reemplazamos el texto

  }

  // Inicializamos el toast de Bootstrap y configuramos opciones
  const toast = bootstrap.Toast.getOrCreateInstance(Istoast, {
    autohide: true,
    delay: 2500
  });

  // Mostramos el toast
  toast.show();
};
