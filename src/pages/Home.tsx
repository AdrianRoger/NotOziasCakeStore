import React, { useContext, useEffect, useState, useTransition } from "react";
import {
  Container,
  Typography,
} from "@mui/material";
import { ProductsContext } from "../context/ProductsContext";
import { IItem } from "../interfaces/interfaces";
import { UserContext } from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsGrid from "../components/ProductsGrid";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const productsContext = useContext(ProductsContext);
  const userContext = useContext(UserContext);
  const { products } = productsContext;
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<IItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage: number = 9;

  useEffect(() => {
    startTransition(() => {
      if (products.length === 0) return;

      const maxPrice = products.reduce(
        (max, item) => (item.price > max.price ? item : max),
        products[0]
      );
      const filtered = products.filter(
        (product) => product.price <= maxPrice.price * 0.35
      );
      setFilteredProducts(filtered);
      setDisplayedProducts(filtered.slice(0, itemsPerPage));
    });
  }, [products]);

  const fetchMoreData = () => {
    if (displayedProducts.length >= filteredProducts.length) {
      setHasMore(false);
      return;
    }
    startTransition(() => {
      const nextProducts: IItem[] = filteredProducts.slice(
        displayedProducts.length,
        displayedProducts.length + itemsPerPage
      );
      setDisplayedProducts((prev) => [...prev, ...nextProducts]);
    });
  };

  return (
    <>
    <Container >
      <Typography variant="h5" component="h2" gutterBottom>
        Welcome {userContext.loggedUser.name || "Unknown"}
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        Discover our promotions
      </Typography>
    </Container>
      {isPending && displayedProducts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
          endMessage={
            <Typography variant="h6" align="center" color="textSecondary">
              No more products
            </Typography>
          }
        >
          <ProductsGrid products={displayedProducts} />
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
