const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyJWT = async (req = request, res = response, next) => {

    const token = req.header("Authorization");
    
    if (!token) {
        res.status(401).json({
            msg: "Token invalido",
        });
        return;
    }

    try {
        const { username } = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                msg: "Token no valido",
            });
        } else  {
            req.activeUser = user;
            next();
        }
    } catch (error) {
        return res.status(401).json({
            msg: "Token no valido",
        });
    }
}

module.exports = {
    verifyJWT
};