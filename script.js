let turnos = [];
let contadorTurnos = 1;

// Elementos del DOM
const nombreClienteInput = document.getElementById("nombreCliente");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnAtender = document.getElementById("btnAtender");
const listaTurnos = document.getElementById("listaTurnos");
const mensaje = document.getElementById("mensaje");
const turnoActual = document.getElementById("turnoActual");

// Registrar turno
btnRegistrar.addEventListener("click", () => {
  const nombre = nombreClienteInput.value.trim();

  if (!nombre) {
    mensaje.textContent = "Ingresa el nombre del cliente.";
    return;
  }

  const nuevoTurno = {
    id: contadorTurnos++,
    nombre,
    fechaCreacion: new Date().toLocaleString(),
    estado: "pendiente"
  };

  turnos.push(nuevoTurno);
  mensaje.textContent = `Turno ${nuevoTurno.id} registrado correctamente.`;

  nombreClienteInput.value = "";
  renderTurnos();
});

// Atender siguiente turno
btnAtender.addEventListener("click", () => {
  const turno = turnos.find(t => t.estado === "pendiente");

  if (!turno) {
    turnoActual.textContent = "ℹ No hay turnos disponibles.";
    return;
  }

  turno.estado = "en_atencion";
  turnoActual.textContent = `Atendiendo turno ${turno.id} - ${turno.nombre}`;

  // Simulación de atención
  setTimeout(() => {
    turno.estado = "atendido";
    turnoActual.textContent = `Turno ${turno.id} atendido correctamente.`;
    renderTurnos();
  }, 2000);

  renderTurnos();
});

// Mostrar turnos pendientes
function renderTurnos() {
  listaTurnos.innerHTML = "";

  const pendientes = turnos.filter(t => t.estado === "pendiente");

  pendientes.forEach(turno => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Turno ${turno.id}</strong> - ${turno.nombre}
      <div class="estado">Creado: ${turno.fechaCreacion}</div>
    `;
    listaTurnos.appendChild(li);
  });
}
