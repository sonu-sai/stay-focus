import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import { Container } from "@material-ui/core";
// import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "60%",
//     },
//     marginLeft: "15%",
//     marginRight: "15%",
//   },

// }));

export default function Dashboard({ setAuth }) {
  // const classes = useStyles();
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseResult = await response.json();
      setName(parseResult.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    toast.success("Logout Successfuly!");
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  });

  return (
    <Fragment>
      <h1>Dashboard {name}</h1>
      <button onClick={(e) => logout(e)}>Logout</button>
      <ToastContainer />
    </Fragment>
  );
}
