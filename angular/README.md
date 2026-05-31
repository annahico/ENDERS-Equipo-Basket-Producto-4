# Producto 2 - Accediendo desde cualquier lugar

## ENDERS Team Basket

Aplicación frontend desarrollada con Angular para la gestión de la plantilla de un equipo de baloncesto.  
En este producto se ha adaptado el proyecto del Producto 1 para trabajar con una base de datos en la nube mediante Firebase Firestore, permitiendo consultar, añadir, editar y eliminar jugadores desde la propia interfaz.

## Objetivo de la práctica

El objetivo principal de esta entrega es convertir una aplicación con datos locales en una aplicación conectada a la nube, sustituyendo el array local por una base de datos remota accesible desde cualquier lugar. Para ello se ha integrado Firebase como servicio de persistencia de datos.

## Funcionalidades implementadas

- Conexión de la aplicación con Firebase.
- Lectura en tiempo real de la colección `players` desde Firestore.
- Visualización de una plantilla con un mínimo de 10 jugadores.
- Alta de nuevos jugadores desde el componente de listado.
- Edición de los datos de un jugador desde el componente de detalle.
- Eliminación de jugadores desde la vista de listado.
- Actualización automática de la interfaz cuando cambian los datos en Firebase.
- Filtros por nombre, posición y edad.
- Visualización del detalle de cada jugador con imagen y vídeos.

## Datos de cada jugador

Cada jugador sigue la estructura definida en el modelo `Player`:

- `id`
- `nombre`
- `apellidos`
- `posicion`
- `edad`
- `altura`
- `foto`
- `videos`

## Tecnologías utilizadas

- Angular 21
- TypeScript
- Firebase
- Firestore
- Bootstrap 5
- HTML5
- CSS3

## Estructura principal del proyecto

```text
src/
  app/
    components/
      detail-component/
      media-component/
      players-component/
    data/
      players.ts
    enviroments/
      enviroment.ts
    models/
      player.ts
    services/
      players.service.ts
```

## Componentes principales

### `players-component`

Se encarga de:

- Mostrar el listado completo de jugadores.
- Aplicar filtros de búsqueda.
- Seleccionar un jugador para ver su detalle.
- Añadir nuevos jugadores.
- Eliminar jugadores existentes.

### `detail-component`

Se encarga de:

- Mostrar la información detallada del jugador seleccionado.
- Reproducir los vídeos asociados.
- Permitir la edición de todos los campos del jugador.
- Guardar los cambios en Firebase.

### `players.service`

Servicio responsable de la comunicación con Firebase:

- Obtiene los jugadores mediante `onSnapshot()` para recibir cambios en tiempo real.
- Inserta nuevos documentos en Firestore.
- Actualiza documentos existentes.
- Elimina documentos de la colección.

## Integración con Firebase

La aplicación utiliza Firebase Firestore como base de datos en la nube.  
La configuración del proyecto se encuentra en:

- `src/app/enviroments/enviroment.ts`

La colección utilizada es:

- `players`

La aplicación se conecta a Firestore y se suscribe a los cambios en tiempo real, de manera que cualquier alta, edición o borrado se refleja automáticamente en la interfaz sin necesidad de recargar la página.

## Instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar el proyecto en local

```bash
npm start
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

### 3. Generar build de producción

```bash
npm run build
```

## Estado actual del proyecto

Actualmente el proyecto:

- Compila correctamente en Angular.
- Está conectado a Firebase.
- Realiza operaciones CRUD sobre la colección `players`.
- Actualiza el listado automáticamente cuando hay cambios en Firestore.
- Mantiene una interfaz visual funcional para consultar y gestionar la plantilla.

## Relación con los requisitos de la práctica

Este proyecto cubre los puntos principales solicitados en el enunciado:

- Persistencia de datos en Firebase.
- Sustitución del array local por una base de datos remota.
- Listado conectado a Firestore.
- Edición de elementos desde el detalle.
- Borrado de elementos desde el listado.
- Formulario para crear nuevos ítems.

## Limitaciones actuales

Aunque la aplicación cumple con la base funcional del producto, hay algunos puntos que conviene dejar claros:

- Las imágenes y los vídeos se guardan actualmente como rutas o URLs, no mediante subida de archivos a Firebase Storage.
- No se han implementado validaciones avanzadas ni mensajes de confirmación/éxito al guardar.
- La configuración de Firebase está incluida en el proyecto y sería recomendable moverla a una estrategia de configuración más controlada para un entorno real.
- El array local de `players.ts` se conserva como referencia del Producto 1, pero la aplicación trabaja ya contra Firestore.

## Posibles mejoras

- Subida real de imágenes y vídeos a Firebase Storage.
- Validación de formularios con mensajes de error.
- Mensajes visuales de éxito o error tras cada operación.
- Separación de entornos de desarrollo y producción.
- Mejora del rendimiento del bundle y de los estilos para ajustarse mejor a los budgets de Angular.

## Comprobación realizada

Se ha verificado la compilación del proyecto con:

```bash
npm run build
```

Resultado:

- Build completada correctamente.
- Existen avisos de tamaño de bundle (`budget`) en Angular, pero no impiden la compilación.

## Autoría y entrega

Proyecto realizado para la asignatura de Desarrollo Front-End con Frameworks avanzados en entornos móviles de la UOC.

Para la entrega final se recomienda acompañar este repositorio con:

- Documento PDF o DOC con explicación del proyecto.
- Capturas de pantalla de Firebase y de la aplicación.
- Enlace al repositorio de GitHub.
- Enlace al proyecto desplegado o importado en CodeSandbox.

