/* --------------------------
-CONSIGNA-
Quiero que mi programa interprete:
npm run start GET products --> consultar productos
npm run start GET products/15 --> consultar producto específico
npm run start POST products T-Shirt-Rex 300 remeras --> crear nuevo producto
npm run start DELETE products/7 --> eliminar producto específico

Y voy a usar dummyjson para simular la API de productos.
----------------------------- */



// La api que voy a usar
const BASE_URL = "https://dummyjson.com/products";

// Node recibe los argumentos en process.argv. 
// Los primeros dos son propios de Node, por eso los descarto.
const [, , method, resource, ...args] = process.argv;

async function main() {
  try {
    // GET - todos los productos
    if (method === "GET" && resource === "products") {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      console.log(data);
      return;
    }

    // GET - un producto específico
    if (method === "GET" && resource.startsWith("products/")) {
      const productId = resource.split("/")[1];

      const response = await fetch(`${BASE_URL}/${productId}`);
      const data = await response.json();

      console.log(data);
      return;
    }

    // POST - crear producto
    if (method === "POST" && resource === "products") {
      const [title, price, category] = args;

      const newProduct = {
        title,
        price: Number(price),
        category
      };

      const response = await fetch(`${BASE_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      });

      const data = await response.json();

      console.log(data);
      return;
    }

    // DELETE - eliminar producto
    if (method === "DELETE" && resource.startsWith("products/")) {
      const productId = resource.split("/")[1];

      const response = await fetch(`${BASE_URL}/${productId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      console.log(data);
      return;
    }

    console.log("Comando no reconocido.");
  } catch (error) {
    console.error("Ocurrió un error:", error.message);
  }
}

main();