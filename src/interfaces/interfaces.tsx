export interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IAPIItem {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  password?: string;
  balance: number;
  cart: IItem[];
}

export interface IStorage {
  key: string;
  value: any;
}