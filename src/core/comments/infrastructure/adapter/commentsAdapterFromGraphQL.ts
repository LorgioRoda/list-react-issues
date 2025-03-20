import { Comment } from "../../domain/Comment";


export const commentsAdapterFromGraphQL = (data: any): Comment[] => {
   const commentsList = data.node.comments.edges.map((edge: any) => ({
    id: edge?.node?.id,
    body: edge?.node?.body,
    author: {
      name: edge?.node?.author?.login,
      avatar: edge?.node?.author?.avatarUrl,
    },
    createdAt: edge.node.createdAt,
  }));
  
  return commentsList
  
};
