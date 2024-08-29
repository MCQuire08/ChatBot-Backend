import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNDkxMTc5MywiaWF0IjoxNzI0OTExNzkzfQ.QwFKNAoC1Wf92N6vMRODLp2v-xtm3o6vy3hnjq5eylw';  // Clave secreta aquí

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    });
};

export default authenticateToken;
