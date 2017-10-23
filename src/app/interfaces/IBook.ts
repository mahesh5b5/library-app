export interface IBook {
  author: string;
  title: string;
  imageUrl: string;
  genre: string;
  id: string;
  isbn: string;
  likes_count: string;
  comments_count: string;
  comments: IComment[];
  description: string;
}

export interface IComment {
  user: string;
  comment: string;
}
