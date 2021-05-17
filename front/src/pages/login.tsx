import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import QueryUser from "../graphql/UserQuery";
import { AuthData } from "../graphql/type";
import { TOKEN } from "../router/utils/constants";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  function handleChange(e: any) {
    const name = e.target.name;
    const type = e.target.type;
    let value = type === "number" ? Number(e.target.value) : e.target.value;
    value = type === "radio" ? e.target.value === "true" : value;
    setState({
      ...state,
      [name]: value,
    });
  }

  function onSubmit(e: any) {
    e.preventDefault();
    const authData: AuthData = {
      username: state.username,
      password: state.password,
    };

    QueryUser.login(authData)
      .then((result: any) => {
        localStorage.setItem(TOKEN, result.data.login.accessToken);
        QueryUser.me().then((result: any) => history.push("/home"));
      })
      .catch((err) => {
        handleOpen();
        console.error("error auth => ", err);
      });
  }

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          autoComplete="fname"
          name="username"
          variant="outlined"
          required
          fullWidth
          id="firstName"
          label="Username"
          autoFocus
          margin="normal"
          value={state.username}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          required
          fullWidth
          margin="normal"
          id="lastName"
          label="Password"
          name="password"
          autoComplete="lname"
          value={state.password}
          onChange={handleChange}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="#">Forgot password?</Link>
          </Grid>
          <Grid item>
            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          Erreur d'authentification !
        </Alert>
      </Snackbar>
    </div>
  );
}
