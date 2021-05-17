import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem("TOKEN");
    history.push("/");
  };

  return (
    <div>
      <p>Home</p>
      <Button onClick={logout}>logout</Button>
    </div>
  );
}
