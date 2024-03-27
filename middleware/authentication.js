const jwt = require('jsonwebtoken');

const ensureAuthentication = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403)
            .json({ message: "Unauthorized" });
    }
    
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        req.userInfo = decoded;
        if (!decoded) {
            return res.status(403)
                .json({ message: "Token is expired. Please re-login." });
        }
        next();
    } catch (err) {
        console.log(err)
        return res.status(403)
            .json({ message: "Token is expired. Please re-login." });
    }
}

module.exports = ensureAuthentication;