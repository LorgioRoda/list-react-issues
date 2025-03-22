import { Comment } from "../../domain/Comment";


export const commentsAdapterFromGraphQL = (data: any): Comment[] => {
  if (!data?.node?.comments?.edges?.length) return [];

   const commentsList = data.node.comments.edges.map((edge: any) => ({
    id: edge?.node?.id,
    body: edge?.node?.body,
    author: {
      name: edge?.node?.author?.login,
      avatar: edge?.node?.author?.avatarUrl,
    },
    createdAt: new Date(edge.node.createdAt),
  }));
  
  return commentsList
  
};
