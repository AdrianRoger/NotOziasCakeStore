import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
  updateUser: (updatedUser: IUser, oldName: string) => void;
  createNewUser: (user: IUser) => IUser | null;
  findUserByIndex: (index: number) => IUser | null;
  findUserByUsername: (username: string) => IUser | null;
  findUserIndexByUsername: (username: string) => number;
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
  updateUser: () => null,
  createNewUser: (user: IUser) => null,
  findUserByIndex: (index: number) => null,
  findUserByUsername: (username: string) => null,
  findUserIndexByUsername: (username: string) => -1,
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

  const cart = useMemo(() => loggedUser.cart, [loggedUser.cart]);
  const balance = useMemo(() => loggedUser.balance, [loggedUser.balance]);

  const addToCart = useCallback((item: IItem) => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      cart: [...prevUser.cart, item],
    }));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      cart: prevUser.cart.filter((_, i) => i !== index),
    }));
  }, []);

  const clearCart = useCallback(() => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      cart: [],
    }));
  }, []);

  const toAdd = useCallback((amount: number) => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      balance: prevUser.balance + amount,
    }));
  }, []);

  const toDebit = useCallback(
    (amount: number) => {
      if (amount >= balance) {
        return false;
      }
      setLoggedUser((prevUser) => ({
        ...prevUser,
        balance: prevUser.balance - amount,
      }));
      return true;
    },
    [balance]
  );

  const setCart = useCallback((newCart: IItem[]) => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      cart: newCart,
    }));
  }, []);

  const setBalance = useCallback((newBalance: number) => {
    setLoggedUser((prevUser) => ({
      ...prevUser,
      balance: newBalance,
    }));
  }, []);

  // UserList Functions
  const findUserByUsername = useCallback(
    (username: string): IUser | null => {
      const user = userList.find((user) => user.username === username);
      return user || null;
    },
    [userList]
  );

  const createNewUser = useCallback(
    (user: IUser): IUser | null => {
      if (findUserByUsername(user.username)) {
        return null;
      }
      setUserList((prevUserList) => [...prevUserList, user]);
      return user;
    },
    [findUserByUsername]
  );

  const findUserIndexByUsername = useCallback(
    (username: string): number => {
      return userList.findIndex((user) => user.username === username);
    },
    [userList]
  );

  const findUserByIndex = useCallback(
    (index: number): IUser | null => {
      return userList[index] || null;
    },
    [userList]
  );

  useEffect(() => {
    console.log("UserContext::172:UserList:: ", JSON.stringify(userList, null, 2));
  }, [userList]);

  useEffect(() => {
    const userIndex = findUserIndexByUsername(loggedUser.username);
    if (userIndex !== -1 && userList[userIndex] !== loggedUser) {
      setUserList((prevUserList) => {
        const newUserList = [...prevUserList];
        newUserList[userIndex] = {
          ...loggedUser,
          cart: loggedUser.cart,
          balance: loggedUser.balance,
        };
        return newUserList;
      });
    }
  }, [loggedUser]);

  const updateUser = useCallback((updatedUser: IUser, oldName: string) => {
    setUserList((prevUserList) => {
      const userIndex = prevUserList.findIndex((user) => user.username === oldName);
      if (userIndex !== -1) {
        const newUserList = [...prevUserList];
        newUserList[userIndex] = updatedUser;
        return newUserList;
      }
  
      return prevUserList;
    });
  }, []);

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
        updateUser,
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
