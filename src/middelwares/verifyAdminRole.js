const { request, response } = require("express");

const verifyAdminRole = (req = request, res = response, next) => {
    
    if(!req.activeUser){
        return res.status(401).json({
            msg: "Permiso denegado"
        });
        return;
    }

    if(req.activeUser.role !== "admin"){
        return res.status(401).json({
            msg: "Permiso denegado"
        });
        return;
    }

    next();
}

module.exports = {
    verifyAdminRole
}