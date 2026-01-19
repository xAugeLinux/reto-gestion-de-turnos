# reto-gestion-de-turnos
Un sistema sencillo para gestionar turnos de atención a clientes.


# Actividad de Programación: Sistema de Gestión de Turnos

## Objetivo
Desarrollar una solución funcional que demuestre dominio de:
- Programación básica
- Lógica de programación avanzada
- Manejo de estados
- Claridad en el razonamiento y diseño

No se evaluará el lenguaje utilizado, sino la lógica, estructura y decisiones tomadas.

---

## Contexto
Un negocio requiere un sistema sencillo para gestionar turnos de atención a clientes.
El sistema debe permitir registrar turnos, atenderlos siguiendo reglas claras y manejar casos especiales.

---

## Reglas Generales
- Puedes usar cualquier lenguaje de programación.
- No es necesario usar frameworks.
- Puedes trabajar en consola o con una interfaz mínima.
- El código debe ser legible y entendible.
- Todo comportamiento debe estar respaldado por lógica clara.

---

## Entregables
1. Código fuente funcional.
2. Un archivo README o comentarios donde expliques:
   - Las decisiones lógicas más importantes.
   - Cómo se manejan los turnos y prioridades.
   - Qué mejorarías con más tiempo.

---

## Fase 1: Modelado del problema
Antes de programar, define claramente:

- Qué es un turno.
- Qué información mínima contiene un turno.
- Qué estados puede tener un turno (ej. activo, atendido, cancelado).
- Qué reglas se deben cumplir para atender turnos.

Estas definiciones pueden estar en comentarios o en el README.

---

## Fase 2: Funcionalidad básica
Implementa la lógica necesaria para:

1. Registrar un nuevo turno.
2. Mostrar la lista de turnos pendientes.
3. Atender el siguiente turno disponible.

Reglas:
- Los turnos normales se atienden en orden de llegada.
- El sistema no debe fallar si no hay turnos disponibles.

---

## Fase 3: Lógica avanzada
Extiende la solución para incluir:

1. Turnos con prioridad alta.
2. Separación lógica entre turnos normales y prioritarios.
3. Cancelación de turnos.
4. Validación para evitar atender turnos cancelados o ya atendidos.

Reglas:
- Los turnos prioritarios siempre se atienden antes que los normales.
- Dentro de cada tipo, se respeta el orden de llegada.
- El sistema debe mantener coherencia de estados.

---

## Fase 4: Casos límite y mejoras
Implementa o explica al menos tres de los siguientes puntos:

- Manejo eficiente de grandes cantidades de turnos.
- Prevención de estados inconsistentes.
- Separación entre lógica de negocio y presentación.
- Estrategia básica de pruebas.
- Mejora en la estructura o legibilidad del código.

Estas mejoras pueden ser código o explicación justificada.

---

## Revisión
Parámetros de valoración:

- Claridad lógica.
- Correcto uso de estructuras de control.
- Manejo de estados.
- Capacidad de explicar decisiones técnicas.
- Orden y mantenibilidad del código.

---
