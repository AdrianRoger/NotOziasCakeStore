import React from "react";
import { IItem } from "../interfaces/interfaces";
import { UserContext } from "../context/UserContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

interface ProductCardProps {
  product: IItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = React.useContext(UserContext);

  return (
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
  );
};

export default ProductCard;
