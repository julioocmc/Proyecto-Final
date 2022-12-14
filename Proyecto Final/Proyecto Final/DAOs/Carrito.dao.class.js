import Producto from "./Producto.dao.class.js";
// import fs from "fs";
import mongoose from 'mongoose'
import CarritoModel from '../Proyecto Final/models/CartModel.js'


export default class Carrito {
	constructor() {
		this.url = "mongodb+srv://Julio:12345678Coder@cluster0.ho8uwm4.mongodb.net/?retryWrites=true&w=majority";
		this.mongodb = mongoose.connect
		this.producto = new Producto();
		//this.carritos = [];
	}

	async crearCarrito(carr) {
		try{
			await this.mongodb(this.url);
			const newCart =  new CarritoModel(carr);
			return await newCart.save();

		}catch(err){
			console.log(err);
			return { error: "No se pudo crear el carrito" }
		}
	}

	// Obtener carrito por ID
	async listar(id) {
		try{
			await this.mongodb(this.ulr);
			return await CarritoModel.findById(id)
			// const contenido = await this.listarAll();

			// // const contJson = Object.values(contenido);
			// let carrito = contenido.find((carr) => carr.id == id);
			// return carrito;
	
	
		}catch(error){
			return {error: "No existen carritos"}
		}
	}

	//Obtener un producto de un carrito
	async listarProd(id){
			 const carrProd = await this.listar(id);
			 console.log(carrProd.length);
			 return carrProd.productos;
				
	}

	// Obtener todos los carritos
	async listarAll() {
		try {
			await this.mongodb(this.url);
			// const contenido = await CarritoModel.find()
			// console.log(contenido);
			return await CarritoModel.find();
			// return contenido.length ? JSON.parse(contenido) : {error: "No existen carritos"}
		} catch (err) {
			return {error: "No existen carritos"}
		}
	}

	// Agregar un carrito y crea el archivo si es que no existe
	async addCarrito() {
		try {
			const contenido = await this.listarAll();
			const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
			const carr = { id: indice + 1, timeStamp: Date.now(), productos: [] };
			contenido.push(carr);
			this.crearCarrito(contenido);
			console.log("--- Carrito agregado ---");
			return carr;	

		} catch (err) {
			await this.crearCarrito([]);
			const contenido = await this.listarAll();
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			contenido.push(carr)
			await this.crearCarrito(contenido);
			return carr;
		}
	}

	// Agrega un producto espec??fico en un carrito espec??fico
	async guardarProductoEnCarrito(idProd, idCarrito) {
		await this.mongodb(this.url);
		const prod = await this.producto.getById(idProd);
		const carr = new CarritoModel(idCarrito)
		return await carr.findByIdAndUpdate(carr,{$push: prod});
			// const carr = await this.listar(idCarrito);
			// console.log(carr.productos);
			// carr.productos.push(prod);

			// this.actualizar(carr, idCarrito);

			//return {msj: "Producto agregado al carrito"};
	}

	// Actualiza el archivo de carrito
	async actualizar(carr, id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((p) => p.id == id);
		carr.timeStamp = Date.now();
		if (index >= 0) {
			contenido.splice(index, 1, { ...carr, id });
			this.crearCarrito(contenido);
			return {msj: "Producto agregado"};
		} else {
			return {error: `Producto con id: ${carr.id} no existe`};
		}
	}

	// Borra un carrito en espec??fico
	async borrar(id) {
		const contenido = await this.listarAll();
		let index = contenido.findIndex((carr) => carr.id == id);
		contenido.splice(index, 1);
		console.log(contenido);
		this.crearCarrito(contenido);

		return {msj: `{ Carrito con id: ${id} eliminado }`};
	}

	// Borra un producto en espec??fico de un carrito
	async borrarProd(idProd, idCarrito){

		const carrito = await this.listar(idCarrito);
		console.log(carrito.productos);
		if(carrito.productos.length){
			for ( var i = 0; i < carrito.productos.length ; i++){
				let obj = carrito.productos[i];
				if ( obj.id == idProd){
					let indexProducto = carrito.productos.findIndex((prod) => prod.id == idProd);
					carrito.productos.splice(indexProducto, 1);
				}
			}
			this.actualizar(carrito, idCarrito);

		return {msj: `Producto con id: ${idProd} eliminado del carrito con id: ${idCarrito}`}

		}else{
			return {msj: "Producto no encontrado"}
		}

	
	}
}
