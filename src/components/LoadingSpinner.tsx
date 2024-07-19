import React from "react";
import { CircularProgress, Container } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Container
      sx={{ display: "flex", justifyContent: "center", paddingBlock: 3 }}
    >
      <CircularProgress />
    </Container>
  );
};

export default LoadingSpinner;