import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { BrowserRouter, Switch, useHistory } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import requireLogin from "./router/guards/requireLogin";
import waitOneSecond from "./router/guards/waitOneSecond";
import NotFound from "./pages/notFound";
import QueryUser from "./graphql/UserQuery";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://source.unsplash.com/1920x1080/?lunch,dinner,breakfast)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

const GLOBAL_GUARDS = [requireLogin, waitOneSecond];

export default function SignInSide() {
  const classes = useStyles();
  let history = useHistory();

  /*useEffect(() => {
    QueryUser.me()
      .then((result) => console.log("me", result.data.me))
      .catch((err) => {
        console.error("error auth => ", err);
      });
  }, []);*/

  return (
    <BrowserRouter>
      <GuardProvider
        guards={GLOBAL_GUARDS as any}
        loading="Loading..."
        error={NotFound}
      >
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Switch>
              <GuardedRoute
                exact
                path="/"
                component={Login}
                meta={{ auth: false }}
              />
              <GuardedRoute
                exact
                path="/register"
                component={Register}
                meta={{ auth: false }}
              />
              <GuardedRoute
                exact
                path="/home"
                component={Home}
                meta={{ auth: true }}
              />
              <GuardedRoute path="*" component={NotFound} />
            </Switch>
          </Grid>
        </Grid>
      </GuardProvider>
    </BrowserRouter>
  );
}
