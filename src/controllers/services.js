const { response, request } = require("express");
const Service = require("../models/services");

const getServices = async (req = request, res = response) => {
    
    const { searchTerm } = req.query;
    console.log(searchTerm);
    try{
        const result = await Service.find({ title: RegExp(searchTerm)});
        res.status(200).json(result);
    } catch (error)
    {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const getService = async (req = request, res = response) => {

    const { id } = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    try{
        const result = await Service.findOne({ _id: id })
        if(!result){
            res.status(404).json({
                msg: "No se encontro el Servicio"
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

const createServices = async (req = request, res = response) => {

    const { title, description, iconName} = req.body;

    if(!title || !description || !iconName){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    try{
        const savedService = new Service({
            title,
            description,
            iconName,
        });
        await savedService.save();
        res.status(201).json({
            msg: "Servicio creado",
            savedService
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error interno",
        });
    }
}

const updateServices = async (req = request, res = response) => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    const { title, description, iconName } = req.body;
    if(!title || !description|| !iconName){
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    const updateData = {
        title,
        description,
        iconName,
    }

    try{
        const result = await Service.updateOne({ _id: id }, updateData);
        if(result?.modifiedCount === 1){ 
            res.status(200).json({
                msg: "Servicio actualizado",
                result
            });
        }
        else{
            res.status(404).json({
                msg: "No se encontro el Servicio"
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

const deleteServices = async (req = request, res = response) => {
    const { id } = req.params;
    if(!id){
        res.status(400).json({
            msg: "Id Invalido"
        })
        return;
    }

    try{
        const result = await Service.deleteOne({ _id: id });
        if(result?.deletedCount === 1){
            res.status(200).json({
                msg: "Servicio eliminado"
            });
        }else{
            res.status(404).json({
                msg: "No se encontro el Servicio"
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
    getServices,
    createServices,
    updateServices,
    deleteServices,
    getService
}