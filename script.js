// ===== Estructuras =====
const turnosMap = new Map();    
const colaAlta = [];            
const colaNormal = [];          
const historial = [];

let contadorTurnos = 1;
const LIMITE_VISTA = 10;

// ===== DOM =====
const nombreClienteInput = document.getElementById("nombreCliente");
const prioridadSelect = document.getElementById("prioridad");
const btnRegistrar = document.getElementById("btnRegistrar");
const btnAtender = document.getElementById("btnAtender");
const listaTurnos = document.getElementById("listaTurnos");
const historialTurnos = document.getElementById("historialTurnos");
const mensaje = document.getElementById("mensaje");
const pantallaTurno = document.getElementById("pantallaTurno");

// ===== Registrar turno =====
btnRegistrar.addEventListener("click", () => {
  const nombre = nombreClienteInput.value.trim();
  const prioridad = prioridadSelect.value;

  if (!nombre) {
    mensaje.textContent = "Ingresa el nombre del cliente";
    return;
  }

  const turno = {
    id: contadorTurnos++,
    nombre,
    prioridad,
    estado: "pendiente",
    fechaCreacion: new Date().toLocaleString()
  };

  turnosMap.set(turno.id, turno);

  if (prioridad === "alta") {
    colaAlta.push(turno.id);
  } else {
    colaNormal.push(turno.id);
  }

  nombreClienteInput.value = "";
  mensaje.textContent = `Turno ${turno.id} registrado`;
  renderTurnos();
});

// ===== Obtener siguiente turno (O(1)) =====
function obtenerSiguienteTurno() {
  while (colaAlta.length) {
    const id = colaAlta.shift();
    const turno = turnosMap.get(id);
    if (turno && turno.estado === "pendiente") return turno;
  }

  while (colaNormal.length) {
    const id = colaNormal.shift();
    const turno = turnosMap.get(id);
    if (turno && turno.estado === "pendiente") return turno;
  }

  return null;
}

// ===== Atender turno =====
btnAtender.addEventListener("click", () => {
  const turno = obtenerSiguienteTurno();

  if (!turno) {
    pantallaTurno.textContent = "---";
    alert("No hay turnos disponibles");
    return;
  }

  turno.estado = "en_atencion";
  pantallaTurno.textContent = `A-${turno.id}`;

  const tiempo = turno.prioridad === "alta" ? 1500 : 2500;

  setTimeout(() => {
    turno.estado = "atendido";
    turno.fechaAtencion = new Date().toLocaleString();
    historial.push(turno);

    pantallaTurno.textContent = "---";
    renderTurnos();
    renderHistorial();
  }, tiempo);

  renderTurnos();
});

// ===== Cancelar turno =====
function cancelarTurno(id) {
  const turno = turnosMap.get(id);

  if (!turno || turno.estado !== "pendiente") {
    alert("No se puede cancelar este turno");
    return;
  }

  turno.estado = "cancelado";
  renderTurnos();
}

// ===== Render turnos =====
function renderTurnos() {
  listaTurnos.innerHTML = "";

  const visibles = [];

  for (let id of colaAlta) {
    const t = turnosMap.get(id);
    if (t?.estado === "pendiente") visibles.push(t);
    if (visibles.length >= LIMITE_VISTA) break;
  }

  for (let id of colaNormal) {
    const t = turnosMap.get(id);
    if (t?.estado === "pendiente") visibles.push(t);
    if (visibles.length >= LIMITE_VISTA) break;
  }

  visibles.forEach(turno => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong class="${turno.prioridad === "alta" ? "prioridad-alta" : ""}">
        Turno ${turno.id} - ${turno.nombre}
      </strong>
      <div class="estado">
        ${turno.prioridad.toUpperCase()} | ${turno.fechaCreacion}
      </div>
      <button onclick="cancelarTurno(${turno.id})">Cancelar</button>
    `;
    listaTurnos.appendChild(li);
  });
}

// ===== Render historial =====
function renderHistorial() {
  historialTurnos.innerHTML = "";

  historial.slice(-10).reverse().forEach(turno => {
    const li = document.createElement("li");
    li.innerHTML = `
      Turno ${turno.id} - ${turno.nombre}
      <div class="estado">
        ${turno.prioridad.toUpperCase()} | ${turno.fechaAtencion}
      </div>
    `;
    historialTurnos.appendChild(li);
  });
}
