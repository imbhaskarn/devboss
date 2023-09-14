import * as dotenv from 'dotenv';
dotenv.config();
import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';

import { createBlogPost } from '@/services/blog/createPost';

export const createPostController = async (req: Request, res: Response) => {
    const { title, meta, description, status, content } = req.body;

    const newPost = createBlogPost({
        title,
        meta,
        description,
        status,
        content,
        authorId: 1,
    });
    return res.status(200).json({
        status: 'success',
        message: 'Post created successfully.',
        data: newPost,
    });
};

export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = req.body.page || 1;
        const posts = await prisma.post.findMany({
            skip: (page - 1) * 12,
            take: 12,
            include: { author: true },
        });
        return res.status(200).json({
            status: 'success',
            message: 'Posts retrieved successfully.',
            data: posts,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            status: 'error',
            message: 'An internal server error occurred.',
        });
    }
};

export const updateBlogController = async (req: Request, res: Response) => {
    const { title, meta, description, status, content } = req.body;

    const updatedPost = await prisma.post.update({
        where: { id: Number(req.params.id) },
        data: {
            title,
            meta,
            description,
            status,
            content,
        },
    });

    return res.status(200).json({
        status: 'success',
        message: 'Post updated successfully.',
        data: updatedPost,
    });
};
