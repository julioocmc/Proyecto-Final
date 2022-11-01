import express from "express";
import Carrito from "../DAOs/Carrito.dao.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.crearCarrito();
	res.send(carritoCreado);
});

router.delete("/:id", async (req, res) => {
	const carritoBorrado = await carrito.borrar(req.params.id);
	res.send(carritoBorrado);
});

router.delete("/:id/productos/:idPrd", async (req, res) => {
	const productoBorrado = await carrito.borrarProd(
		req.params.idPrd,
		req.params.id
		);
		res.send(productoBorrado);
})

router.get("/", async (req, res) => {
	const response = await carrito.listarAll();
	res.send(response);
	// carrito.listarAll().then(listaCarritos => {
	// 	res.send(listaCarritos);
	// })
});

router.get("/:id", async (req, res) => {
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listar(carroBuscado);
	res.send(cont);
});

router.get("/:id/productos", async (req, res) => {
	const carroBuscado = Number(req.params.id);
	const cont = await carrito.listarProd(carroBuscado);
	res.send(cont);
	console.log(cont)
});



router.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});
export default router;