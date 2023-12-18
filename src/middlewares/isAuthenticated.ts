import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { user } from 'typings/custom';
interface ExtendedRequest extends Request {
  user: user
}

const isAuthenticated = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Get the token from the header
  const bearerToken = req.headers['authorization'];
  console.log(bearerToken);
  if (!bearerToken) {
    res.status(403).json({ error: 'Authentication required!' });
    return;
  }

  const token = bearerToken.split(' ')[1]; // Extract token from "Bearer <token>"

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded : user) => {
    if (err) {
      console.log(err);
      res.status(401).json({ error: 'Invalid token!' });
      return;
    }

    req.user = decoded
    next(); // Move to next middleware or route handler
  });
};
export default isAuthenticated;
