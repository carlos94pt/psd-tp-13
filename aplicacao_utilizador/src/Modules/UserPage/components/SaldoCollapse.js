import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
   header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   closeTab: {
      cursor: "pointer",
   },
   paper: {
      display: "flex",
      height: "4rem",
      justifyContent: "flex-end",
      alignItems: "center",
   },
   container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(8),
   },
   form: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
   },
   submit: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
   },
   erro: {
      marginTop: theme.spacing(2),
   },
   notifications: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
   },
}));

const SaldoCollapse = (props) => {
   const classes = useStyles();
   const [closeSaldo, setCloseSaldo] = useState(false);
   const [matricula, setSaldo] = useState(0);
   const [estacionamento, setEstacionamento] = useState(0);
   const [utilizador, setUtilizador] = useState(0);
   const [erro, setErro] = useState(false);
   const [erroMessage, setErroMessage] = useState("");
   const [sucesso, setSucesso] = useState(false);

   useEffect(() => {
      setCloseSaldo(props.showSaldo);
   }, [props.showSaldo]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const requestOptions = {
         method: "POST",
         url: "http://localhost:5000/entrada",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
         data: {
            matricula: matricula,
            idParque: estacionamento,
         },
      };

      axios
         .request(requestOptions)
         .then((res) => {
            setSucesso(true);
         })
         .catch((err) => {
            setErro(true);
            setErroMessage(err.response.data.message);
         });
   };

   const handleClose = () => {
      setCloseSaldo(false);
   };

   return (
      <Collapse in={closeSaldo}>
         <div className={classes.header}>
            <Typography variant="h6" component="h3">
               Entrada No Estacionamento
            </Typography>
            <Typography
               variant="h4"
               component="h3"
               className={classes.closeTab}
               onClick={handleClose}
            >
               &times;
            </Typography>
         </div>
         <Container maxWidth="sm" className={classes.notifications}>
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
            <Collapse in={sucesso} className={classes.erro}>
               <Alert
                  variant="filled"
                  severity="success"
                  action={
                     <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                           setSucesso(false);
                        }}
                     >
                        <CloseIcon fontSize="inherit" />
                     </IconButton>
                  }
               >
                  Saldo atualizado
               </Alert>
            </Collapse>
         </Container>
         <Container maxWidth="sm" className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
               <TextField
                  id="outlined-basic"
                  label="Matrícula do Veículo"
                  variant="outlined"
                  value={matricula}
                  onChange={(e) => setSaldo(e.target.value)}
                  required
               />
               <TextField
                  id="outlined-basic"
                  label="Id do Parque"
                  variant="outlined"
                  value={estacionamento}
                  onChange={(e) => setEstacionamento(e.target.value)}
                  required
               />
               
               <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Adicionar
               </Button>
            </form>
         </Container>
      </Collapse>
   );
};

export default SaldoCollapse;
