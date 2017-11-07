import { IBook } from './IBook';

export interface IUser {
  id?: string;
  username: string;
  password: string;
  created?: Date;
  is_admin?: boolean;
  my_books?: IBook[];
  liked_books?: IBook[];
}
