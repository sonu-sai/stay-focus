import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "60%",
    },
    marginLeft: "16%",
    marginRight: "15%",
  },
}));

export default function Login({ setAuth }) {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseResult = await response.json();
      if (parseResult.token) {
        localStorage.setItem("token", parseResult.token);
        setAuth(true);
        toast.success("Login Successfuly!");
      } else {
        setAuth(false);
        toast.error(parseResult);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Container className={classes.root}>
        <Grid>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <h1>Login</h1>
          </Grid>
          <form noValidate autoComplete="off" onSubmit={onSubmitForm}>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <TextField
                required
                fullWidth
                id="outlined-required"
                label="Required"
                variant="outlined"
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <TextField
                id="outlined-password-input"
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                name="password"
                value={password}
                placeholder="password"
                onChange={(e) => onChange(e)}
              />
            </Grid>
            <br />
            <Grid item xs={10} sm={10} md={10} lg={10}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </form>
          <Grid item xs={10} sm={10} md={10} lg={10}>
            <br />
            <Link to="/register">Register</Link>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
      <br />
    </>
  );
}
