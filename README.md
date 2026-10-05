# API de Productos — Node.js

Programa de consola desarrollado con **Node.js** que permite consultar, crear y eliminar productos utilizando la API de **DummyJSON** como simulación de una API real.

El programa recibe los comandos mediante `process.argv`, por lo que las operaciones se realizan directamente desde la terminal.

## ¿Qué hace el programa?

El programa permite realizar cuatro operaciones principales:

* **GET**: consultar todos los productos.
* **GET**: consultar un producto específico por su ID.
* **POST**: crear un nuevo producto.
* **DELETE**: eliminar un producto específico.

La API utilizada es:

`https://dummyjson.com/products`

## Requisitos

Para ejecutar el proyecto es necesario tener instalado:

* [Node.js](https://nodejs.org/)
* npm, que viene incluido con Node.js.

El proyecto utiliza `fetch`, disponible de forma nativa en versiones modernas de Node.js.

## Uso

### Consultar todos los productos

```bash
npm run start GET products
```

Realiza una solicitud `GET` a la API y devuelve la lista de productos disponibles.

### Consultar un producto específico

```bash
npm run start GET products/15
```

Busca y devuelve el producto cuyo ID es `15`.

El número puede reemplazarse por cualquier otro ID:

```bash
npm run start GET products/7
```

### Crear un nuevo producto

```bash
npm run start POST products T-Shirt-Rex 300 remeras
```

Crea un nuevo producto utilizando los datos proporcionados:

* **Título:** `T-Shirt-Rex`
* **Precio:** `300`
* **Categoría:** `remeras`

El programa convierte automáticamente el precio de texto a número utilizando `Number()`.

Internamente realiza una solicitud:

```http
POST /products/add
```

con un cuerpo JSON similar a:

```json
{
  "title": "T-Shirt-Rex",
  "price": 300,
  "category": "remeras"
}
```

### Eliminar un producto

```bash
npm run start DELETE products/7
```

Realiza una solicitud `DELETE` para eliminar el producto con ID `7`.

## ¿Cómo funciona internamente?

El programa obtiene los argumentos ingresados en la terminal mediante:

```javascript
const [, , method, resource, ...args] = process.argv;
```

Los dos primeros valores de `process.argv` corresponden a información utilizada por Node.js, por lo que se descartan.

A partir del tercer elemento se obtienen:

* `method`: método HTTP (`GET`, `POST`, `DELETE`)
* `resource`: recurso solicitado (`products`, `products/15`, etc.)
* `args`: argumentos adicionales utilizados principalmente para crear productos.

Luego, la función `main()` analiza la combinación de método y recurso y determina qué operación debe realizar.

## Métodos HTTP utilizados

| Método | Comando             | Función                        |
| ------ | ------------------- | ------------------------------ |
| GET    | `GET products`      | Obtener todos los productos    |
| GET    | `GET products/15`   | Obtener un producto específico |
| POST   | `POST products ...` | Crear un producto              |
| DELETE | `DELETE products/7` | Eliminar un producto           |

## Manejo de errores

Las operaciones se encuentran dentro de un bloque `try...catch`.

Si ocurre un error durante la ejecución, el programa muestra un mensaje en la consola:

```text
Ocurrió un error: [mensaje del error]
```

Si el comando ingresado no coincide con ninguna de las operaciones disponibles, muestra:

```text
Comando no reconocido.
```

## Tecnologías utilizadas

* **Node.js**
* **JavaScript**
* **Fetch API**
* **DummyJSON**
* **npm**

## Objetivo

El objetivo del proyecto es practicar el consumo de una API mediante Node.js y trabajar con los principales métodos HTTP (`GET`, `POST` y `DELETE`) utilizando argumentos ingresados desde la línea de comandos.
