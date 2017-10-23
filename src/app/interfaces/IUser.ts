import { IBook } from './IBook';

export interface IUser {
  username?: string;
  password: string;
  created: string;
  is_admin: boolean;
  my_books: IBook[];
}
