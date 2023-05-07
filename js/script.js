const CANTIDAD_MAXIMA_TURNOS = 3;
const MINUTOS_DURACION_CONSULTA = 20;
const EXIT_WORD = "SALIR";

let turnosTomados = 0;
let opcionUsuario = "";


function hayTurnosDisponibles() {
  if (turnosTomados == CANTIDAD_MAXIMA_TURNOS) {
    return false;
  } else {
    return true;
  }
}

function minutosDeEspera() {
  if (turnosTomados == 0) {
    return 0;
  } else {
    return turnosTomados * MINUTOS_DURACION_CONSULTA;
  }
}

function asignarTurno() {
  if (hayTurnosDisponibles()) {
    turnosTomados += 1;
    return true;
  } else {
    return false;
  }
}

function dniEsValido(dni) {
  if (dni.length < 8 || parseInt(dni) == NaN) {
    return false;
  } else {
    return true;
  }
}

function nombreEsValido(nombre) {
  if (nombre.length < 3) {
    return false;
  } else {
    return true;
  }
}

function solicitarDatosPaciente() {
  let dniPaciente = 0;
  let nombrePaciente = "";
  do {
    dniPaciente = prompt("Ingrese su DNI: ");
    if (!dniEsValido(dniPaciente)) {
      alert("El DNI ingresado no es válido");
    }
  } while (!dniEsValido(dniPaciente));

  do {
    nombrePaciente = prompt("Ingrese su nombre: ");
    if (!nombreEsValido(nombrePaciente)) {
      alert(
        "El nombre no pueden ser solo números y debe tener mas de 3 caracteres."
      );
    }
  } while (!nombreEsValido(nombrePaciente));
  return "DNI: " + dniPaciente + "\n" + "Nombre: " + nombrePaciente;
}

function mostrarEstadoTurnos() {
  console.log(
    "Cantidad máxima de turnos disponibles: ",
    CANTIDAD_MAXIMA_TURNOS
  );
  console.log("Cantidad de turnos tomados: ", turnosTomados);
  console.log("Turnos disponibles: ", CANTIDAD_MAXIMA_TURNOS - turnosTomados);
  console.log(
    "Tiempo de espera para el proximo paciente: ",
    minutosDeEspera(),
    " minutos"
  );
  console.log("----------------------------");
}

//COMIENZA ESTRUCTURA PRINCIPAL


for (let i = 0; i < CANTIDAD_MAXIMA_TURNOS; i++) {
  opcionUsuario = prompt(
    "Para solicitar un turno escriba el número 1.\nEl tiempo de espera es: " +
      minutosDeEspera() +
      " minutos\n" +
      "Para salir escriba: SALIR."
  );

  if (opcionUsuario == EXIT_WORD) {
    break;
  }

  if (opcionUsuario != 1 && opcionUsuario != EXIT_WORD) {
    alert("La opción selecionada no existe.");
    i--;
  } else if (opcionUsuario == 1) {
    let paciente = solicitarDatosPaciente();
    if (asignarTurno()) {
      alert("Turno asignado con éxito a: \n" + paciente);
      console.log("Turno asignado a: \n" + paciente);
      mostrarEstadoTurnos();
    } else {
      alert("No hay mas turnos disponibles.");
    }
  }
}

if(opcionUsuario == EXIT_WORD) {
  alert("Adios.");
}else {
  alert("No hay mas turnos disponibles. El programa finalizará.")
}
