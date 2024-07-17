import React, { useState, useContext } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { UserContext } from '../context/UserContext';

interface AddBalanceFormProps {
  handleClose: () => void;
}

const AddBalanceForm: React.FC<AddBalanceFormProps> = ({ handleClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const userContext = useContext(UserContext);

  const { toAdd } = userContext;

  const handleAddBalance = () => {
    toAdd(amount);
    handleClose();
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField
        label="Amount"
        type="number"
        fullWidth
        margin="normal"
        onChange={(e) => setAmount(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))}
      />
      <Button variant="contained" color="secondary" onClick={handleAddBalance}>
        Add Money
      </Button>
    </Box>
  );
};

export default AddBalanceForm;
