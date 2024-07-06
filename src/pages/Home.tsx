import React, { useContext, useEffect, useState } from "react";
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
import { IItem } from "../interfaces/interfaces";
import { UserContext } from "../context/UserContext";


const Home = () => {
  const productsContext = useContext(ProductsContext);
  const userContext = useContext(UserContext);
  const { products } = productsContext;
  const [filteredProducts, setFilteredProducts] = useState<IItem[]>([]);

  useEffect(()=>{
    const maxPrice = products.reduce((max, item) => item.price > max.price ? item : max , products[0])
    const filtered = products.filter((product) => product.price <= maxPrice.price * 0.35);
    setFilteredProducts(filtered)
  }, [products])
  

  const { addToCart } = userContext;

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Welcome {userContext.loggedUser.name || "Unknown"}
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
      Discover our promotions
      </Typography>
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
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

export default Home;