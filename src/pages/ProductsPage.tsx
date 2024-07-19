import {
  FC,
  useCallback,
  useContext,
  useState,
  useTransition,
  useEffect,
} from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductSearch from "../components/ProductSearch";
import { IItem } from "../interfaces/interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsGrid from "../components/ProductsGrid";

const ProductsPage: FC = () => {
  const { products } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<IItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();

  const itemsPerPage: number = 20;

  useEffect(() => {
    startTransition(() => {
      setFilteredProducts(products);
      setDisplayedProducts(products.slice(0, itemsPerPage));
    });
  }, [products]);

  const handleSearch = useCallback(
    (query: string) => {
      startTransition(() => {
        const filtered = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
        setDisplayedProducts(filtered.slice(0, itemsPerPage));
        setHasMore(filtered.length > itemsPerPage);
      });
    },
    [products]
  );

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
      setDisplayedProducts([...displayedProducts, ...nextProducts]);
    });
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Products
      </Typography>
      <ProductSearch onSearch={handleSearch} />
      {isPending && displayedProducts.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          dataLength={displayedProducts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={(<LoadingSpinner />)}
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

export default ProductsPage;
