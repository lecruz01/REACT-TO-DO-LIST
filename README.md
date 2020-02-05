# REACT-TODO-APP

![React TailwindCSS](/readme-assets/logos.jpeg "React TailwindCSS")

Este repositorio implementa el frontend de la aplicacion ToDo elaborada con React. Se utilizo la libreria de utilidades TailwindCSS para el diseño de las interfaces.

## Inicializar el proyecto

Para instalar las dependecias del proyecto ejecutaremos en la terminal el siguiente comando. Se requiere utilizar la versión LTS de NodeJS (*12.14.1*) o superior, y la versión *6.13.4* o superior de NPM.

```bash
npm install
```

### Iniciar servidor de desarrollo

Antes de iniciar el proyecto debemos crear en la carpeta raíz un archivo `.env` en el que incluiremos la siguiente variable:

```bash
REACT_APP_APOLLO_URL=http://localhost:4000/graphql
```

Esto servira para indicar a React la ubicacion en la red de nuestro servidor backend y poder realizar las solicitudes de datos correctamente.

Para iniciar el proyecto en un servidor local con hot-reload ejecutaremos el siguiente comando en la terminal.

```bash
npm run start
```

### Crear compilado del proyecto para despliegue

Si deseamos crear un compilado productivo de la aplicación usaremos el siguiente comando en la terminal.

```bash
npm run build
```

### Iniciar servidor productivo local

Una vez hayamos creado la versión compilada y optimizada del proyecto, podemos ejecutarla en un servidor local utilizando el modulo Serve, el cúal podemos instalar con el siguiente comando.

```bash
npm install serve -g
```

E iniciar el servidor con el comando.

```bash
serve -s build
```
