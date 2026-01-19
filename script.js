let turnos = [];
let contadorTurnos = 1;

// DOM
const nombreClienteInput = document.getElementById("nombreCliente");
const prioridadSelect = document.getElementById("prioridad");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnAtender = document.getElementById("btnAtender");
const listaTurnos = document.getElementById("listaTurnos");
const mensaje = document.getElementById("mensaje");
const turnoActual = document.getElementById("turnoActual");

// Registrar turno
btnRegistrar.addEventListener("click", () => {
  const nombre = nombreClienteInput.value.trim();
  const prioridad = prioridadSelect.value;

  if (!nombre) {
    mensaje.textContent = "Ingresa el nombre del cliente.";
    return;
  }

  const turno = {
    id: contadorTurnos++,
    nombre,
    fechaCreacion: new Date().toLocaleString(),
    prioridad,
    estado: "pendiente"
  };

  turnos.push(turno);
  mensaje.textContent = `Turno ${turno.id} registrado (${prioridad}).`;

  nombreClienteInput.value = "";
  renderTurnos();
});

// Atender siguiente turno (prioridad primero)
btnAtender.addEventListener("click", () => {
  const turno =
    turnos.find(t => t.estado === "pendiente" && t.prioridad === "alta") ||
    turnos.find(t => t.estado === "pendiente" && t.prioridad === "normal");

  if (!turno) {
    turnoActual.textContent = "No hay turnos disponibles.";
    return;
  }

  turno.estado = "en_atencion";
  turnoActual.textContent = `Atendiendo turno ${turno.id} (${turno.prioridad})`;

  // Simulación de SLA / atención
  setTimeout(() => {
    turno.estado = "atendido";
    turnoActual.textContent = `Turno ${turno.id} atendido.`;
    renderTurnos();
  }, turno.prioridad === "alta" ? 1500 : 2500);

  renderTurnos();
});

// Cancelar turno
function cancelarTurno(id) {
  const turno = turnos.find(t => t.id === id);

  if (turno.estado === "atendido") {
    alert("No se puede cancelar un turno atendido.");
    return;
  }

  turno.estado = "cancelado";
  renderTurnos();
}

// Renderizar turnos pendientes
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
