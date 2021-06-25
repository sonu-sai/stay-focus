import React, { Fragment, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard({ setAuth }) {
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
