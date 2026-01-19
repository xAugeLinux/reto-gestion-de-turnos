let turnos = [];
let historial = [];
let contadorTurnos = 1;

// DOM
const nombreClienteInput = document.getElementById("nombreCliente");
const prioridadSelect = document.getElementById("prioridad");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnAtender = document.getElementById("btnAtender");
const listaTurnos = document.getElementById("listaTurnos");
const historialTurnos = document.getElementById("historialTurnos");
const mensaje = document.getElementById("mensaje");
const pantallaTurno = document.getElementById("pantallaTurno");

// Registrar turno
btnRegistrar.addEventListener("click", () => {
  const nombre = nombreClienteInput.value.trim();
  const prioridad = prioridadSelect.value;

  if (!nombre) {
    mensaje.textContent = "Ingresa el nombre del cliente.";
    return;
  }

  turnos.push({
    id: contadorTurnos++,
    nombre,
    prioridad,
    fechaCreacion: new Date().toLocaleString(),
    estado: "pendiente"
  });

  mensaje.textContent = "Turno registrado correctamente.";
  nombreClienteInput.value = "";
  renderTurnos();
});

// Atender siguiente turno
btnAtender.addEventListener("click", () => {
  const turno =
    turnos.find(t => t.estado === "pendiente" && t.prioridad === "alta") ||
    turnos.find(t => t.estado === "pendiente" && t.prioridad === "normal");

  if (!turno) {
    pantallaTurno.textContent = "---";
    alert("No hay turnos disponibles");
    return;
  }

  turno.estado = "en_atencion";
  pantallaTurno.textContent = `A-${turno.id}`;

  const tiempoAtencion = turno.prioridad === "alta" ? 1500 : 2500;

  setTimeout(() => {
    turno.estado = "atendido";

    historial.push({
      ...turno,
      fechaAtencion: new Date().toLocaleString()
    });

    pantallaTurno.textContent = "---";
    renderTurnos();
    renderHistorial();
  }, tiempoAtencion);

  renderTurnos();
});

// Cancelar turno
function cancelarTurno(id) {
  const turno = turnos.find(t => t.id === id);

  if (turno.estado !== "pendiente") {
    alert("No se puede cancelar este turno.");
    return;
  }

  turno.estado = "cancelado";
  renderTurnos();
}

// Render turnos pendientes
function renderTurnos() {
  listaTurnos.innerHTML = "";

  turnos
    .filter(t => t.estado === "pendiente")
    .forEach(turno => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong class="${turno.prioridad === "alta" ? "prioridad-alta" : ""}">
          Turno ${turno.id} - ${turno.nombre}
        </strong>
        <div class="estado">
          Prioridad: ${turno.prioridad} | Creado: ${turno.fechaCreacion}
        </div>
        <button onclick="cancelarTurno(${turno.id})">Cancelar</button>
      `;
      listaTurnos.appendChild(li);
    });
}

// Render historial de turnos atendidos
function renderHistorial() {
  historialTurnos.innerHTML = "";

  historial.forEach(turno => {
    const li = document.createElement("li");
    li.innerHTML = `
      Turno ${turno.id} - ${turno.nombre}
      <div class="estado">
        Prioridad: ${turno.prioridad} | Atendido: ${turno.fechaAtencion}
      </div>
    `;
    historialTurnos.appendChild(li);
  });
}
