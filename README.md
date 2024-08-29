# ChatBot-Backend

Este es el backend para el proyecto ChatBot, desarrollado en Node.js utilizando Express y Prisma ORM. El backend proporciona una API REST para gestionar las conversaciones de un chatbot, almacenar mensajes, y manejar usuarios.

## Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)

## Descripción General

El objetivo de este proyecto es construir un backend que soporte un chatbot interactivo. Este backend se encarga de manejar las solicitudes de los usuarios, almacenar las conversaciones y responder a los mensajes. Está construido sobre Express y utiliza Prisma para gestionar las operaciones con la base de datos.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el lado del servidor.
- **Express**: Framework web minimalista para construir aplicaciones Node.js.
- **Prisma**: ORM (Object-Relational Mapping) moderno que facilita la interacción con la base de datos.
- **TypeScript**: Superset de JavaScript que añade tipado estático, lo que mejora la robustez y mantenibilidad del código.
- **SQLite**: Base de datos relacional ligera y auto-contenida ideal para desarrollo.

## Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu entorno de desarrollo:

- **Node.js**: Versión 14 o superior.
- **npm**: Versión 6 o superior.

Puedes verificar si estas herramientas están instaladas ejecutando los siguientes comandos:

```bash
node -v
npm -v

## Ejecución del Proyecto

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el Repositorio

Primero, clona el repositorio del proyecto en tu máquina local:

```bash
git clone https://github.com/MCQuire08/ChatBot-Backend.git
cd ChatBot-Backend

### 2. Ejecutar en modo desarrollo

```bash
npm install
npx prisma migrate dev --name init
npm run dev

