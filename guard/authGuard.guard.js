const { verifyToken } = require('../utils/jwt.util');
const AdminModel = require('../models/Admin.model');
const logger = require('../logger');

const authGuard = async (req, res, next) => { // Renamed for clarity
    try {
        let token = null;
        const authHeader = req.headers.authorization;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is required'
            });
        }

        const payload = verifyToken(token);
        const admin = await AdminModel.findById(payload.adminId);

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access.'
            });
        }

        // IMPORTANT: We use req.admin so the profile controller can find it
        admin.password = undefined;
        req.admin = admin; 

        next();
    } catch (error) {
        logger.error(error.stack); 
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}

module.exports = { authGuard }; // Exporting as authGuard