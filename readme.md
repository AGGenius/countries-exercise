# Countries App

El objetivo de este ejercicio es crear una pagina web con varias subpaginas que se renderizan dependiendo del contenido seleccionado.
Hay que hacer uso de una API externa, localstorage, bucles avanzados y DOM.



## Instrucciones

- Ver que tiene la API en varios endpoints (todos los paises, 1 pais y 1 capital) y que opciones permite como parametros.

- Crear una pagina de bienvenida en index.html basica con un titulo, subtitulo y un boton que al clicar vaya a otro archivo html.

- Crear un archivo html para renderizar todos los paises y otro para renderizar una capital. Tambien un archivo de JS que encapsule la logica de todos los paises y otro para la de la capital

- Hacer uso de la API para traer todos los paises con la informacion de que se muestra en la imagen de referencia *"desktop-design-home-light.jpg"*

- En la página de los paises debe de haber un cuadro de texto para buscar un pais en concreto. Y un boton de opciones para filtrar por región

- Al clicar en un pais debe mandarte a la página de la capital de dicho pais con la informacion que se muestra en la imagen de referencia *desktop-design-detail-light.jpg* con un boton para volver atrás.

- Hacer diseño de toda la web igual a las referencias en modo PC y mobile

- Implementar el modo oscuro con el localstorage para recordar cual es el modo seleccionado en futuras sesiones.

## Importante !!

Los iconos necesarios para la web están implementados en: common/icons/theme-icons.js

Son dos funciones que las cuales hacen uso del DOM para crear el icono pero son personalizables según los argumentos que se les pasen al importar e invocar dichas funciones.


### ¿Como se hace?

Aqui un ejemplo de como se utilizaria esas funciones. 

(*No hay que modificar las funciones, solo invocarlas pero si lo veis necesario podeis modificarlas.*)

```javascript
import {moonIcon, arrowIcon} from "../common/icons/theme-icons.js"

const bodyDom = document.body

moonIcon(bodyDom, "20px", "red")

arrowIcon(bodyDom, "40px", "blue")
```
