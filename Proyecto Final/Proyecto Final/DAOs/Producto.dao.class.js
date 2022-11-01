import mongoose from 'mongoose'
import ProductoModel from '../Proyecto Final/models/ProductoModel.js';

export default class Producto {
	constructor() {
		this.url = 'mongodb+srv://Julio:12345678Coder@cluster0.zif4o6k.mongodb.net/?retryWrites=true&w=majority'
		this.mongodb = mongoose.connect
	}

	// Crear Archivo con el producto
	async createData(prod) {
		try {
			await this.mongodb(this.url);
			const newProduct = new ProductoModel(prod);
			return await newProduct.save();
		} catch (err) {
			console.log(err)
		}
	}
	// Obtener producto por Id
	async getById(id) {
		try {
			//findById es un metodo de mongoose
			await this.mongodb(this.url);
			return await ProductoModel.findById(id);

		} catch (error) {
			return { error: "Producto no existe" }
		}
	}
	// Obtener todos los productos

	async getAll() {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.find();

		} catch (err) {
			return { error: "No existen productos" }
		}
	}
	// Agregar producto(a un carrito)
	async save(prod) {
		try {
		} catch (err) {
		}

	}

	// Actualizar un producto
	async put(id, prod) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndUpdate(id, prod);

		} catch (err) {
			console.log(err)
		}
	}

	// Borrar un producto
	async borrar(id) {
		try {
			await this.mongodb(this.url);
			return await ProductoModel.findByIdAndDelete(id);

		} catch (err) {
			return { error: "No existen productos" }
		}


	}
}