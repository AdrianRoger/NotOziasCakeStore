import React, { createContext, useState, ReactNode, useEffect, useCallback } from "react";
import { IItem, IUser } from "../interfaces/interfaces";

interface UserContextProps {
  loggedUser: IUser;
  setLoggedUser: (user: IUser) => void;
  cart: IItem[];
  addToCart: (item: IItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  setCart: (cart: IItem[]) => void;
  balance: number;
  toAdd: (amount: number) => void;
  toDebit: (amount: number) => boolean;
  setBalance: (amount: number) => void;
  userList: IUser[];
  createNewUser: (user: IUser) => IUser | null;
  findUserByIndex: (index: number) => IUser | null;
  findUserByUsername: (usename: string) => IUser | null;
  findUserIndexByUsername: (usename: string) => number;
}

export const UserContext = createContext<UserContextProps>({
  loggedUser: {
    id: -1,
    name: "",
    username: "",
    balance: 0,
    cart: [],
  },
  setLoggedUser: (user: IUser) => {},
  cart: [],
  addToCart: (item: IItem) => {},
  removeFromCart: (index: number): void => {},
  clearCart: () => {},
  setCart: (cart: IItem[]) => {},
  balance: 0,
  toAdd: (amount: number) => {},
  toDebit: (amount: number) => false,
  setBalance: (amount: number) => {},
  userList: [],
  createNewUser: (user:IUser) => null,
  findUserByIndex: (index: number) => null,
  findUserByUsername: (usename: string) => null,
  findUserIndexByUsername: (usename: string) => -1,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userList, setUserList] = useState<IUser[]>([
    {
      id: 1,
      name: "Adrian",
      username: "admin",
      password: "admin",
      balance: 789,
      cart: [],
    },
  ]);
  const [loggedUser, setLoggedUser] = useState<IUser>({
    id: -1,
    name: "",
    username: "",
    balance: 0,
    cart: [],
  });

  const [cart, setCart] = useState<IItem[]>(loggedUser.cart);
  const [balance, setBalance] = useState<number>(loggedUser.balance);

  const addToCart = (item: IItem) => {
    setCart((cart) => [...cart, item]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const toAdd = (amount: number) => {
    setBalance(balance + amount);
  };

  const toDebit = (amount: number) => {
    if (amount >= balance) {
      return false;
    }
    setBalance(balance - amount);
    return true;
  };

  //UserList Functions
  const findUserByUsername = (username: string): IUser | null => {
    const userIndex = userList.findIndex((user) => user.username === username);
    if (userIndex !== -1) {
      return userList[userIndex];
    }
    return null;
  };

  const createNewUser = (user: IUser): IUser | null => {
    const userIndex = userList.findIndex((u) => u.username === user.username);
    if (userIndex === -1) {
      setUserList((prevItems) => [...prevItems, user])
      return userList[userList.length - 1];
    }
    return null;
  };

  const findUserIndexByUsername = useCallback((username: string): number => {
    return userList.findIndex((user) => user.username === username);
  }, [userList]);

  const findUserByIndex = (index: number): IUser | null => {
    return userList[index];
  };
  //UserList Functions

  useEffect(() => {
    loggedUser.balance = balance;
    loggedUser.cart = cart;
    const userIndex = findUserIndexByUsername(loggedUser.username);
    if (userIndex !== -1) {
      userList[userIndex] = loggedUser;
    }

  }, [cart, balance, loggedUser, findUserIndexByUsername, userList]);

  return (
    <UserContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        balance,
        setBalance,
        toAdd,
        toDebit,
        userList,
        createNewUser,
        findUserByIndex,
        findUserByUsername,
        findUserIndexByUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
