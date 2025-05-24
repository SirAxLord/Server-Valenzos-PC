const { response, request } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req = request, res = response) => {
    const {  username, password } = req.body ?? "";

    if(!username || !password){
        res.status(400).json({
            msg: "Datos invalidos"
        })
        return;
    }

    try {
    const user = await User.findOne({ username });
    if(!user){
        res.status(401).json({
            msg: "Datos invalidos"
        })
        return;
    }


    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        res.status(401).json({
            msg: "Datos invalidos"
        })
        return;
    }

    jwt.sign({
        username: user.username,
        role: user.role
    }, process.env.SECRET_KEY, {
        expiresIn: "4h"
    }, (error, token) => {
        if(error){
            console.log(error);
            res.status(500).json({
                msg: "Error en el servidor"
            })
            return;
        } else {
            res.status(200).json({
                msg: "Login exitoso",
                token
            });
        }
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al iniciar sesion"
        })
        return;
    }
}

const register = async (req = request, res = response) => {
    const {  username, password, role } = req.body ?? ""; 

    if(!username || !password){
        res.status(400).json({
            msg: "Datos invalidos"
        })
        return;
    }

    try{
        const user = await User.findOne({ username: username });
        if(user){
            res.status(400).json({
                msg: "El usuario ya existe"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword,
        });

        const allowedRoles = ['user', 'admin'];
        if (role && allowedRoles.includes(role)) {
            newUser.role = role; 
        } else if (role) {
            console.warn(`Rol inválido '${role}' proporcionado. Se usará el rol por defecto.`);
        }

        await newUser.save();
        res.status(200).json({
            msg: "Usuario registrado exitosamente",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al registrar el usuario"
        })
        return;
    }
}

module.exports = {
    login,
    register
};