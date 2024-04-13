import prisma from '../config/db';

export const getAllComments = async () => {
  const comments = await prisma.comment.findMany();
  return comments;
}