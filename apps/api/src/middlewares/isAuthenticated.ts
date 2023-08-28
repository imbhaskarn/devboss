import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string; // Replace with your secret key.

interface ExtendedRequest extends Request {
    user?: JwtPayload;
}

const isAuthenticated = (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): void => {
    // Get the token from the header
    const bearerToken = req.headers['authorization'];

    if (!bearerToken) {
        res.status(401).json({ error: 'Authentication required!' });
        return;
    }

    const token = bearerToken.split(' ')[1]; // Extract token from "Bearer <token>"

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token!' });
            return;
        }

        req.user = decoded as JwtPayload; // Attach decoded payload to request object
        next(); // Move to next middleware or route handler
    });
};
export default isAuthenticated;
