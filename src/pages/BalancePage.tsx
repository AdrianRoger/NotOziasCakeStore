import Container from "@mui/material/Container";
import React, { useContext, useState } from "react";
import { Button, Typography } from "@mui/material";
import AddBalanceForm from "../components/AddBalanceForm";
import Modal from "../components/Modal";
import { UserContext } from "../context/UserContext";

const BalancePage: React.FC = () => {
  const userContext = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { balance } = userContext;

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Typography variant="h6" component="h4" gutterBottom>
        Balance
      </Typography>
      <Container>
        <Typography variant="h6">
          Your current balance is: $ {balance.toFixed(2)}
        </Typography>
        <Button color="secondary" onClick={handleOpen}>
          Add Money
        </Button>
      </Container>
      <Modal open={modalOpen} handleClose={handleClose} title="Deposit">
        <AddBalanceForm handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default BalancePage;
