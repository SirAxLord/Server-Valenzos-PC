const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const connectDB = require("./database");

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.productsPath = "/api/products";
        this.servicesPath = "/api/services";
        this.authPath = "/api/auth";
        this.docsPath = "/";

        this.app.use(cors());
        this.app.use(express.json());
        this.routes();
        connectDB();
    }

    routes() {
        this.app.use(this.productsPath, require("../routes/products"));
        this.app.use(this.servicesPath, require("../routes/services"));
        this.app.use(this.authPath, require("../routes/auth"));
        this.app.use(this.docsPath, require("../routes/docs"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor escuchando el puerto " + this.port);
        });
    }
}

module.exports = Server;