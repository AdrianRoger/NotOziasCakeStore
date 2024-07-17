import React, { createContext, useState, ReactNode } from 'react';
import { IItem } from '../interfaces/interfaces';
import { faker } from '@faker-js/faker';

interface ProductsContextProps {
  products: IItem[];
  // fetchProducts: () => void;
}

export const ProductsContext = createContext<ProductsContextProps>({products:[]});

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IItem[]>([]);

  React.useMemo(() => {
    const fakeProducts:IItem[] = Array.from({length: 500}, (_, id) => ({
      id,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price({
        min: 30, max: 500, dec: 2
      }))
    }))

    setProducts(fakeProducts)
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
