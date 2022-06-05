import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
   erro: {
      marginTop: theme.spacing(2),
   },
}));

function RegisterForm(props) {
   const classes = useStyles();
   let history = useHistory();

   const [nome, setNome] = useState("");
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirm, setPasswordConfirm] = useState("");
   const [tipo, setTipo] = useState("");
   const [erro, setErro] = useState(false);
   const [erroMessage, setErroMessage] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      if (password !== passwordConfirm) {
         setErro(true);
         setErroMessage("As passwords precisam de ser iguais");
         setPassword("");
         setPasswordConfirm("");
      } else {
         const requestOptions = {
            method: "POST",
            url: "http://localhost:5000/registar",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            data: {
               username: username,
               nome: nome,
               email: email,
               password: password,
               tipo:tipo
            },
         };
         axios
            .request(requestOptions)
            .then((response) => {
               history.push("/login");
            })
            .catch((err) => {
               setErro(true);
               if (
                  err.response.status === 404 &&
                  err.response.data.name === "MongoError"
               ) {
                  setErroMessage(
                     capitalizeFirstLetter(
                        Object.keys(err.response.data.keyPattern)[0]
                     ) + " já existe"
                  );
               } else {
                  setErroMessage(err.message);
               }
            });
      }
   };

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <Avatar className={classes.avatar}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
               Registar
            </Typography>

            <Collapse in={erro} className={classes.erro}>
               <Alert
                  variant="filled"
                  severity="error"
                  action={
                     <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                           setErro(false);
                        }}
                     >
                        <CloseIcon fontSize="inherit" />
                     </IconButton>
                  }
               >
                  {erroMessage}
               </Alert>
            </Collapse>

            <form
               className={classes.form}
               valide="true"
               onSubmit={handleSubmit}
            >
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        value={nome}
                        autoComplete="lname"
                        onChange={(e) => setNome(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Endereço de email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Confirmar password"
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                         variant="outlined"
                         required
                         fullWidth
                         name="tipo"
                         label="Tipo (0 - Cliente, 1- Gestor) "
                         type="tipo"
                         id="tipo"
                         value={tipo}
                         onChange={(e) => setTipo(e.target.value)}
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Registar
               </Button>
               <Grid container justify="flex-end">
                  <Grid item>
                     <Link to="/login" variant="body2">
                        Já possui conta? Entrar
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}

export default RegisterForm;
