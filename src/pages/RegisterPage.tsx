import React, { useState, useEffect, useContext, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IUser } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  validateName,
  validateUsername,
  validatePassword,
  validateConfirmPassword,
} from "../validations/registerValidations";
import { PersonAdd } from "@mui/icons-material";

interface RegisterProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const RegisterPage: React.FC<RegisterProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const {
    userList,
    setLoggedUser,
    createNewUser,
    findUserByIndex,
    findUserByUsername,
  } = userContext;

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValidationError = validateName(name);
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(
      password,
      confirmPassword
    );

    if (findUserByUsername(username)) {
      setUsernameError("Username already exists");
      return;
    }

    setNameError(nameValidationError);
    setUsernameError(usernameValidationError);
    setPasswordError(passwordValidationError);
    setConfirmPasswordError(confirmPasswordValidationError);

    if (
      nameValidationError ||
      usernameValidationError ||
      passwordValidationError ||
      confirmPasswordValidationError
    ) {
      return;
    }

    const newUser: IUser = {
      id: userList.length + 1,
      name,
      username,
      password,
      balance: 0,
      cart: [],
    };
    const createdUser = createNewUser(newUser);

    if (createdUser !== null) {
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify({
          index: userList.length,
          username: createdUser.username,
        })
      );
      navigate("/");
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    const logged = localStorage.getItem("isAuthenticated");
    if (logged !== null) {
      const dataStoraged = JSON.parse(logged);
      const user = findUserByIndex(Number(dataStoraged.index));
      if (user !== null && dataStoraged.username === user?.username) {
        setLoggedUser(user);
        navigate("/");
      }
    }
  }, [navigate, setLoggedUser, findUserByIndex]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PersonAdd />
        </Avatar>
        <Typography component="h5" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            inputRef={nameInputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!nameError}
            helperText={nameError}
            variant="filled"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
            variant="filled"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            variant="filled"
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            variant="filled"
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
