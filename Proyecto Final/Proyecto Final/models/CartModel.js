import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    productos: []
})

const CarritoModel = mongoose.model('carrito', carritoSchema);

export default CarritoModel;