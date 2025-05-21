const { response, request } = require("express");
const Product = require("../models/products");

const getProducts = async (req = request, res = response) => {
    
    const { searchTerm } = req.query;
    console.log(searchTerm);
    try{
        const result = await Product.find({ title: RegExp(searchTerm)});
        res.status(200).json(result);
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const getProduct = async (req = request, res = response) => {

    const { id } = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    try{
        const result = await Product.findOne({ _id: id })
        if(!result){
            res.status(404).json({
                msg: "No se encontro el producto"
            })
            return;
        }
        res.status(200).json({result});
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const createProducts = async (req = request, res = response) => {

    const { title, description, price, iconName, image } = req.body;

    if(!title || !description || !price || !iconName || !image){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    try{
        const savedProduct = new Product({
            title,
            description,
            price,
            iconName,
            image
        });
        await savedProduct.save();
        res.status(201).json({
            msg: "Producto creado",
            savedProduct
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const updateProducts = async (req = request, res = response) => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    const { title, description, price, iconName, image } = req.body;
    if(!title || !description || !price || !iconName || !image){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    const updateData = {
        title,
        description,
        price,
        iconName,
        image
    }

    try{
        const result = await Product.updateOne({ _id: id }, updateData);
        if(result?.modifiedCount === 1){ 
            res.status(200).json({
                msg: "Producto actualizado",
                result
            });
        }
        else{
            res.status(404).json({
                msg: "No se encontro el producto"
            })
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const deleteProducts = async (req = request, res = response) => {
    const { id } = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    try{
        const result = await Product.deleteOne({ _id: id });
        if(result?.deletedCount === 1){
            res.status(200).json({
                msg: "Producto eliminado"
            });
        }else{
            res.status(404).json({
                msg: "No se encontro el producto"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
    getProduct
}