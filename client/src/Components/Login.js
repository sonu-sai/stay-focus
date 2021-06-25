import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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
    <Fragment className={classes.root}>
      <h1>Login</h1>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmitForm}
      >
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={(e) => onChange(e)}
        />

        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
        />

        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Link to="/register">Register</Link>
      <ToastContainer />
    </Fragment>
  );
}
