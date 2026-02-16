import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next)=>{
    const auth = req.headers.authorization || " ";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if(!token) return res.status(401).json({message: "token not provided"});
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({message: "invalid token"})
    }
}


export const requireAdmin = (req, res, next)=>{
    if(req.user?.role !== "admin") return res.status(403).json({message: "only admins have access"});
    next();
}