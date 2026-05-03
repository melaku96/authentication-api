import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(400).json({
            success: false,
            message: 'No token found'
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();

    } catch (error) {
           res.status(500).json({
            success: false,
            message: error.message
        });
    }

}