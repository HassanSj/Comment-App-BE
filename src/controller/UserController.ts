import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/User";
import RequestResponseMappings from "../utils/RequestResponseMappings";
const jwt = require("jsonwebtoken");

function generateToken(user: any) {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, "abcdef", { expiresIn: "1h" });

  return token;
}

export default {
  addUser: async (req: Request, res: Response) => {
    try {
      const { name, email, password }: any = req.body;
      const verificationRepository = getRepository(User);
      const verification = new User();
      verification.name = name;
      verification.email = email;
      verification.password = password;
      const savedUser = await verificationRepository.save(verification);
      const token = generateToken(savedUser);
      return res
        .status(201)
        .json({ message: "User Record saved", user: savedUser, token });
    } catch (error: any) {
      console.error("Error getting response:", error);
      return RequestResponseMappings.sendErrorMessage(
        res,
        error.message.toString()
      );
    }
  },
  loginUser: async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ where: { name, password } });
      const token = generateToken(user);
      if (user) {
        res
          .status(200)
          .json({ message: "User Record saved", user: user, token });
      } else {
        res.status(401).json({ message: "Login failed" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getUserbyID: async (req: Request, res: Response) => {
    try {
      const results = await getRepository(User).findOneBy({
        id: parseInt(req.params.id),
      });
      return res.send(results);
    } catch (e: any) {
      return RequestResponseMappings.sendErrorMessage(res, e.message);
    }
  },
  // getUserByUsername: async (req: Request, res: Response) => {
  //   const userRepository = getRepository(User);

  //   try {
  //     const email: string = req.query.email as string;
  //     console.log("Received email:", email); // Add this line for debugging

  //     const user = await userRepository.findOne({
  //       where: { email },
  //     });

  //     if (user !== undefined) {
  //       return res.send({ username: user.username  });
  //     } else {
  //       return res.status(404).send({ message: "User not found" });
  //     }
  //   } catch (error) {
  //     console.error("Error:", error); // Add this line for debugging
  //     return res.status(500).send({ message: "Internal server error" });
  //   }
  // },

  getUserDetails: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const tokenValue = token.replace("Bearer ", "");
      jwt.verify(tokenValue, "abcdef", async (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }
        console.log('Decoded Token:', decoded);
        const userId = decoded.id;
        const userRepository = getRepository(User);
        try {
          const userEntity = await userRepository.findOne({
            where: { id: userId },
          });
          if (!userEntity) {
            return res.status(404).json({ message: "User not found" });
          }
          return res.status(200).json(userEntity);
        } catch (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Error fetching user details" });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching user details" });
    }
  },
};
