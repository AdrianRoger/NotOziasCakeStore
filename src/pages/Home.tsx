import React, { useContext, useEffect, useState, useTransition } from "react";
import {
  Container,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { ProductsContext } from "../context/ProductsContext";
import { IItem } from "../interfaces/interfaces";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const productsContext = useContext(ProductsContext);
  const userContext = useContext(UserContext);
  const { products } = productsContext;
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      const maxPrice = products.reduce(
        (max, item) => (item.price > max.price ? item : max),
        products[0]
      );
      const filtered = products.filter(
        (product) => product.price <= maxPrice.price * 0.35
      );
      setFilteredProducts(filtered);
    });
  }, [products]);

  const { addToCart } = userContext;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Welcome {userContext.loggedUser.name || "Unknown"}
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        Discover our promotions
      </Typography>
      {isPending ? (
        <Container sx={{display: "flex", justifyContent: "center", paddingBlock: 3}}>
          <CircularProgress />
        </Container>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
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
      )}
    </>
  );
};

export default Home;
