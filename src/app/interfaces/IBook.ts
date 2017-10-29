export interface IBook {
  author: string;
  title: string;
  imageUrl: string;
  genre: string;
  id: string;
  isbn: string;
  likes_count?: string;
  comments_count?: string;
  comments?: IComment[];
  description: string;
  averageRating?: string;
  language?: string;
  pageCount?: string;
  previewLink?: string;
  publishedDate: string;
  publisher: string;
  ratingsCount?: string;
  subtitle?: string;
  added_date: Date;
}

export interface IComment {
  user: string;
  comment: string;
}
