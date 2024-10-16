# Monorepo de Microservicios en NestJS

Este repositorio contiene un monorepo creado con NestJS que implementa microservicios para la gestión de usuarios y tareas.

## Estructura del Proyecto

- `user-service`: Microservicio para la gestión de usuarios.
- `task`: Microservicio para la gestión de tareas.

## Instalación

Para instalar las dependencias del proyecto, ejecuta:

```bash
npm install
```

## Ejecutar Migraciones
```bash
npm run migrate
```

## Revertir Migraciones
```bash
npm run migration:down
```

## Correr los Microservicios

```bash
nest start user-service --watch
nest start task --watch


```

