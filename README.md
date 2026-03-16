# 🏦 front_bancoudea

Frontend de la plataforma **BancoUdeA**, una aplicación diseñada para gestionar clientes y transacciones bancarias de forma rápida, segura y eficiente.

Este proyecto proporciona una interfaz moderna que permite consultar información de clientes, realizar transacciones y visualizar el historial de operaciones realizadas.

Este proyecto fue desarrollado usando **Next.js** y siguiendo la metodología de **Atomic Design** para la estructura de los componentes.  

## Tecnologías y Metodología

- **Next.js**: Framework de React para aplicaciones web con renderizado híbrido (SSG y SSR), rutas automáticas y optimización de performance.
- **Atomic Design**: Arquitectura de componentes que organiza la UI en cinco niveles:
  - **Atoms**: Componentes más básicos (botones).
  - **Molecules**: Combinación de átomos para crear pequeñas secciones funcionales.
  - **Organisms**: Bloques complejos que combinan moléculas y átomos.
  - **Templates**: Layouts de páginas que estructuran organismos en una página.
  - **Pages**: Páginas finales que usan templates y organismos para mostrar contenido.

## Características del proyecto

- Gestión de estado y comunicación entre componentes siguiendo buenas prácticas de React y Next.js.
- Estilos responsivos con TailwindCSS (opcional si usas Tailwind).

## Beneficios de la arquitectura

- **Reutilización**: Componentes pequeños y modulares que se pueden reutilizar en toda la aplicación.
- **Escalabilidad**: Fácil agregar nuevas funcionalidades sin romper la estructura existente.
- **Mantenibilidad**: Código organizado y predecible, facilitando el trabajo en equipo.

---

## ✨ Características principales

La aplicación está compuesta por tres módulos principales:

### 👤 Clientes
Permite buscar y visualizar la información de los clientes registrados en el sistema.

Funciones principales:
- 🔎 Búsqueda de clientes
- 🧾 Consulta rápida de datos relevantes
- 👤 Creación/Edición de Clientes
- ✖️ Eliminación de Clientes

### 💸 Transacciones
Módulo encargado de ejecutar operaciones financieras entre cuentas.

Funciones principales:
- 💰 Transferencias entre cuentas
- ✔️ Validación de datos de la transacción
- ⚡ Procesamiento rápido de operaciones

---

### 📊 Historial de Transacciones
Permite consultar el registro de operaciones realizadas en el sistema.

Funciones principales:
- 🕒 Visualización cronológica de transacciones
- 🔍 Filtros para búsqueda de movimientos
- 📑 Seguimiento de operaciones realizadas

---
