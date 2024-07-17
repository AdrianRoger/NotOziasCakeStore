import React, { useCallback, useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { ProductsContext } from "../context/ProductsContext";
import ProductSearch from "../components/SearchProducts";
import { IItem } from "../interfaces/interfaces";
import { UserContext } from "../context/UserContext";

const ProductsPage: React.FC = () => {
  const productsContext = useContext(ProductsContext);
  const userContext = useContext(UserContext);
  const { products } = productsContext;
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);

  const { addToCart } = userContext;

  const handleSearch = useCallback(
    (query: string) => {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    },
    [products]
  );

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Products
      </Typography>
      <ProductSearch onSearch={handleSearch} />
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="h6"
                  className="typography-ellipsis-1"
                >
                  {product.name}
                </Typography>
                <Divider />
                <Typography component="p" className="typography-ellipsis-2">
                  {product.description}
                </Typography>
                <Typography color="textSecondary">
                  $ {product.price.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => addToCart(product)}
                >
                  Add do Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductsPage;
