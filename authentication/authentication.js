const jwt = require("jsonwebtoken");

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization");
        if(token) {
            token = token.slice(7);
            jwt.verify(token, process.env.jwt , ( error, decoded ) => {
                if(error) {
                    res.json({
                        success: false,
                        message: "Invalid token"
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({
                success: false,
                message: "Access denied! unauthorized user"
            });
        }
    }
}