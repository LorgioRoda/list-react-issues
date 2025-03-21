export interface Comment {
    id: string;
    body: string;
    author: {
      name: string;
      avatar: string;
    };
    createdAt: Date;
  }
  