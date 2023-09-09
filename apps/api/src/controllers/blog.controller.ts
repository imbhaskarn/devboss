import * as dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import {
  checkIfEmailExists,
  checkIfUsernameExists,
} from "@/services/user/userExists";

import bcrypt from "bcrypt";
import { createUser } from "@/services/user/createUser";
import jwt from "jsonwebtoken";
import { createBlogPost } from "@/services/user/blog/createPost";

export const createPostController = async (req: Request, res: Response) => {
  const { title, meta, description, status, content } = req.body;

  createBlogPost({title, meta, description, status, content, authorId: 1})
 
};

export const getBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;

    // Check if a user with the provided email already exists
    const userWithEmail = await checkIfEmailExists(email);
    if (userWithEmail) {
      return res.status(409).json({
        result: "error",
        message: "Email is already registered.",
      });
    }

    // Check if a user with the provided username already exists
    const userWithUsername = await checkIfUsernameExists(username);
    if (!userWithUsername) {
      return res.status(409).json({
        result: "error",
        message: "Username is already in use.",
      });
    }

    // Hash the provided password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database with the hashed password
    const newUser = await createUser(email, username, hashedPassword);
    if (newUser) {
      return res.json({
        result: "success",
        message: "User created successfully!",
      });
    }
  } catch (e) {
    next(e);
  }
};

export const updateBlogController = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email }, // Note: This is not recommended for security reasons
        ],
      },
    });

    // If user doesn't exist
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials.",
      });
    }
    //generate jwt access token
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      process.env.SECRET as string,
      {
        expiresIn: "1d", //
      }
    );
    // Successful login
    return res.status(200).json({
      status: "success",
      message: "Login successfull.",
      data: {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "An internal server error occurred.",
    });
  }
};
