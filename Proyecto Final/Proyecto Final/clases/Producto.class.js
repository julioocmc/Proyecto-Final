import fs from "fs";

// Defino los productos
// let productos = []
export default class Producto {
	constructor() {
		// this.itemList = productos;
		this.id = 0;
	}

	// Crear Archivo con el producto
	async createData(prod) {
		try {
			await fs.promises.writeFile("./productos.txt", JSON.stringify(prod, null, 2), "utf-8");
			return prod;
		} catch (err) {
			console.log("No se pudo agregar el archivo")
		}
	}
	// Obtener producto por Id
	async getById(id) {
		try{
			const contenido = await this.getAll();
			let producto = contenido.find((prod) => prod.id == id);
			return producto || { error: "producto no encontrado" };
	
		}catch(error){
			return {error: "Producto no existe"}
		}
	}
	// Obtener todos los productos
	async getAll() {
		try {
			const contenido = await fs.promises.readFile("./productos.txt", "utf-8");

			return contenido.length ? JSON.parse(contenido) : {error: "No existen productos"}
		} catch (err) {
			return {error: "No existen productos"}
		}
	}
	// Agregar producto(a un carrito)
	async save(prod) {
		try {
			const contenido = await this.getAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			prod.id = indice + 1;
			prod.timeStamp = Date.now();
			contenido.push(prod);
			this.createData(contenido);
			console.log("----Nuevo producto ingresado----")
			return prod;
		} catch (err) {
			await this.createData([]);
			const contenido = await this.getAll();
			prod.id = 1;
			prod.timeStamp = Date.now();
			contenido.push(prod);
			this.createData(contenido);
			console.log("----Nuevo producto ingresado----")
			return prod;
		}

	}

	// Actualizar un producto
	async put(id, prod) {
		try {
			const contenido = await this.getAll();
			let index = contenido.findIndex((p) => p.id === id);
			prod.timeStamp = Date.now();
			if (index >= 0) {
				contenido.splice(index, 1, { ...prod, id });
				this.createData(contenido);
				return prod;
			} else {
				return {msj: `Producto con id: ${prod.id} no existe`};
			}

		} catch (err) {
			console.log(err)
		}
	}
	
	// Borrar un producto
	async borrar(id) {
			const contenido = await this.getAll();
			let index = contenido.findIndex((prod) => prod.id == id);
			console.log(index)
			if(index > 0){
				contenido.splice(index, 1);
				this.createData(contenido);
				return {msj: `Producto con id: ${id} eliminado`};			

			}else{
				return {msj: `Producto con id: ${id} no encontrado`};
			}


	}
}