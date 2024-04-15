import prisma from '../config/db';

export const getAllComments = async () => {
  const comments = await prisma.comment.findMany();
  return comments;
}

export const postComment = async (comment: string,author: string) => {
  const newComment = await prisma.comment.create({
    data: {
      comment: comment,
      author:  author
    }
  });
  return newComment;
}