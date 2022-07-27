const inputNacimineto = document.querySelector("#birth");

export function valida(input) {
  
  const tipoDeInput = input.dataset.tipo;
  console.log(tipoDeInput)
  console.log(input)
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = ""
  } else {
    console.log(input.validity.valid)
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoDeInput,input)
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
]

const mensajeDeError = {
  nombre: {
    valueMissing: "Este capo no puede esta bacio",
  },
  email: {
    valueMissing: "Este capo no puede esta bacio",
    typeMismatch: "Correo no valido",
  },
  password: {
    valueMissing: "Este capo no puede esta bacio",
    patternMismatch: "al menos 6 caracteres"
  },
  nacimiento:{
    valueMissing: "Este capo no puede esta bacio",
    customError: "Debes tener al menos 18 años"
  },
  numero: {
    valueMissing: 'Este campo no puede estar vacio',
    patternMismatch: 'El formato requerido es xxxxx'
  },
  
    direccion : {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'La direccion debe contener entre 10 a 40 caracteres'       
    },
    ciudad : {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'El nombre debe tener entre 3 y 10'       
    },
    estado : {
      valueMissing: 'Este campo no puede estar vacio',
      patternMismatch: 'El nombre debe tener entre 3 y 10'       
    }
};





const validadores = {
  nacimineto: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input){
  console.log(tipoDeInput , input)
  let mensaje = "" 
  tipoDeErrores.forEach((error) => {
    if(input.validity[error]){
      console.log(tipoDeInput, error)
      console.log(input.validity[error])
      console.log(mensajeDeError[tipoDeInput][error])
      mensaje = mensajeDeError[tipoDeInput][error]
    }
  })
  console.log(mensaje)
  return mensaje
}

inputNacimineto.addEventListener("blur", (evento) => {
  validarNacimiento(evento.target);
});

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = " ";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  console.log(" fecha actual " + fechaActual);
  const diferenciaFecha = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciaFecha <= fechaActual;
}
