import express from "express";
import routerCarrito from "../routes/Carrito.router.js";
import routerProductos from "../routes/Productos.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);

const PORT = 8081;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));