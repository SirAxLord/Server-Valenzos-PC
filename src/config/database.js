const mongoose = require('mongoose');

const connectDB = () => {


    mongoose.connect("mongodb://localhost:27017", {
        dbName: "valenzos_pc_db",
    }).then(
        () => {
            console.log("Conexion exitosa con la BD");
        }
    ).catch(
        (error) => {
        console.log("Error de la conexion con la BD ");
        console.log(error);
        }
    )
}

module.exports = connectDB;