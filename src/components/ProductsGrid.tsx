import React from "react";
import { Grid } from "@mui/material";
import { IItem } from "../interfaces/interfaces";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: IItem[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;