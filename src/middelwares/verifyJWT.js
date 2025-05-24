// En tu archivo de middleware, ej. src/middelwares/verifyJWT.js

const { request, response } = require("express");
const jwt =require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = async (req = request, res = response, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Token inválido o no proporcionado en el formato Bearer",
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            msg: "Token no encontrado después de Bearer",
        });
    }

    try {
        const decodedPayload = jwt.verify(token, process.env.SECRET_KEY);
        const username = decodedPayload.username;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                msg: "Token no válido (usuario no encontrado)",
            });
        } else {
            req.activeUser = user;
            next();
        }
    } catch (error) {
        console.error('BACKEND: Error al verificar el token en middleware verifyJWT:', error.name, '-', error.message);
        let errorMessage = "Token no válido";
        if (error.name === 'TokenExpiredError') {
            errorMessage = 'Token ha expirado';
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage = 'Token malformado o firma inválida';
        }
        return res.status(401).json({
            msg: errorMessage,
            errorDetail: error.name
        });
    }
}

module.exports = {
    verifyJWT
};