// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("Pas de permissions");
//   try {
//     const verified = jwt.verify(
//       token,
//       `${process.env.TOKEN_SECRET}`,
//       (err: any, decoded: any) => {
//         if (err)
//           return res
//             .status(400)
//             .send({ msg: "erreur lors de l authentication" });
//         req.body.uid = decoded.uid;
//         next();
//       }
//     );
//   } catch (error) {
//     res.status(400).send({ msg: "Token d authentication invalid" });
//   }
// }

// export default async function studentMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     let unprotected = ["/register", "/login"];
//     let {
//       age,
//       birthDate,
//       email,
//       fullName,
//       gender,
//       infected,
//       password,
//       username,
//     } = req.body;
//     if (req.url == "/api/register") {
//       if (
//         !req.body.age ||
//         !req.body.birthDate ||
//         !req.body.email ||
//         !req.body.fullName ||
//         !req.body.gender ||
//         !req.body.infected ||
//         !req.body.password ||
//         !req.body.registerDate ||
//         !req.body.username
//       )
//         return res.status(400).send("Les donnees sont incomplets!");
//       next();
//     } else if (req.url == "/login") {
//       if (!req.body.email || !req.body.password)
//         return res.status(400).send("Les donnees sont incomplets!");
//       next();
//     } else {
//       if (req.url == "/modifyUser") {
//         if (
//           !req.body.birthDate ||
//           !req.body.email ||
//           !req.body.fullName ||
//           !req.body.username
//         )
//           return res.status(400).send("Les donnees sont incomplets!");
//       }
//       verifyToken(req, res, next);
//     }
//   } catch (error: any) {
//     res.send("Erreur inconnue!");
//   }
// }
