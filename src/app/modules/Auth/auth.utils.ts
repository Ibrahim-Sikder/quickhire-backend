import jwt, { JwtPayload } from 'jsonwebtoken';

export interface TJwtPayload extends JwtPayload {
  userId: string;
  role: string;
  name?: string;
}

export const createToken = (
  jwtPayload: TJwtPayload,
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as TJwtPayload;
};
