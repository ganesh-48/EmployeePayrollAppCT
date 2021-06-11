const jwt = require("jsonwebtoken");

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7);
            jwt.verify(token, process.env.jwt , ( error ) => {
                if(error) {
                    return res.status(400).send({
                        success: false,
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "Access denied! unauthorized user"
            });
        }
    }
}