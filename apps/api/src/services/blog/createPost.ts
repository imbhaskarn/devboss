import prisma from '@/.prisma';
import { Status } from '@prisma/client';

// Define an enum for the 'status' property
type Role = 'admin' | 'user';

export const createBlogPost = async ({
  title,
  description,
  meta,
  status,
  content,
  authorId,
}: {
  title: string;
  description: string;
  meta: string;
  status: Status;
  content: string;
  authorId: number;
}) => {
  return await prisma.post.create({
    data: {
      title,
      meta,
      description,
      status,
      content,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  });
};
