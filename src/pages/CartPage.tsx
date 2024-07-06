import React, { useState, useContext } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { UserContext } from "../context/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [successPurchase, setSuccessPurchase] = useState<boolean>(false);
  const navigate = useNavigate();

  const { balance, toDebit, cart, removeFromCart, clearCart } = userContext;

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const purchase = (amount: number) => {
    if (!toDebit(amount)) {
      setSuccessPurchase(false);
      handleOpen();
      return;
    }
    setSuccessPurchase(true);
    handleOpen();
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    if (successPurchase) {
      clearCart();
    }
    setSuccessPurchase(false);
  };

  const keepBuying = () => {
    navigate("/products");
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Shopping Cart
      </Typography>
      <Typography component="p" align="right">
        Balance: $ {balance.toFixed(2)}
      </Typography>
      {cart.length > 0 ? (
        <>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`$ ${item.price.toFixed(2)}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeFromCart(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography variant="h6">Total: $ {totalPrice.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => keepBuying()}
            sx={{ mr: "5px" }}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => purchase(Number(totalPrice))}
          >
            chekout
          </Button>
          <Modal open={modalOpen} handleClose={handleClose} title="Purchase">
            {successPurchase ? (
              <>
                <Typography component="p" sx={{ mb: "10px" }}>
                  Purchase successful! Your cart has been cleared.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClose()}
                >
                  Close
                </Button>
              </>
            ) : (
              <>
                <Typography component="p" sx={{ mb: "10px" }}>
                  Purchase failed. Insufficient balance.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleClose()}
                >
                  Close
                </Button>
              </>
            )}
          </Modal>
        </>
      ) : (
        <>
          <Typography>Your cart is empty.</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => keepBuying()}
          >
            Go to Products
          </Button>
        </>
      )}
    </>
  );
};

export default CartPage;
