import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({ msg: "Token d'authentication introuvable!" });
  try {
    jwt.verify(
      token,
      `${process.env.TOKEN_SECRET}`,
      (err: any, decoded: any) => {
        if (err)
          return res
            .status(401)
            .send({ msg: "Erreur lors de l authentication!" });
        if (decoded.isAdmin) {
          if (!req.baseUrl.includes("admin")) {
            return res
              .status(401)
              .send({ msg: "vous n'etes pas un utilisateur!" });
          }
        } else if (!decoded.isAdmin) {
          if (!req.baseUrl.includes("user"))
            return res.status(401).send({ msg: "vous n'etes pas un admin!" });
        }
        if (req.baseUrl.includes("user") || req.url.includes("getAdmin"))
          req.body.uid = decoded.uid;
        next();
      }
    );
  } catch (error) {
    res.status(400).send({ msg: "Erreur lors de l authentication!" });
  }
}
