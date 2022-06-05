import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ActionButton from "./ActionButton";
import ListaCollapse from "./ListaCollapse";
import HistoryCollapse from "./HistoryCollapse";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: theme.spacing(2),
   },
   root2: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   menuTittle: {
      marginTop: theme.spacing(6),
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
   },
   content: {
      marginTop: theme.spacing(4),
   },
}));

const UserDetails = () => {
   const classes = useStyles();
   const [isShowLista, setShowLista] = useState(false);
   const [isShowHistory, setShowHistory] = useState(false);
   const [nome, setNome] = useState("");

   useEffect(() => {
      const requestOptions = {
         method: "GET",
         url: "http://localhost:5000/utilizador",
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
      };
      axios.request(requestOptions).then((response) => {
         setNome(response.data.nome);
      });
   }, []);


   const handleHistory = () => {
      setShowLista(false);
      setShowHistory(true);
   };

   const handleLista = () => {
      setShowHistory(false);
      setShowLista(true);

   }

   return (
       <>
          <CssBaseline />
          <Container maxWidth="xl" className={classes.root}>
             <Typography variant="h4" component="h3">
                Bem-vindo!
             </Typography>
             <Typography variant="h6" component="h3">
                {nome}
             </Typography>
          </Container>
          <Container maxWidth="xl" className={classes.menuTittle}>
             <Typography variant="h6" component="h3">
                Ações
             </Typography>
          </Container>
          <Container maxWidth="xl" className={classes.root2}>
             <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                   <Paper className={classes.paper} onClick={handleHistory}>
                      <ActionButton
                          tittle="Histórico"
                          description="Ver estacionamentos anteriores"
                      />
                   </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                   <Paper className={classes.paper} onClick={handleLista}>
                      <ActionButton
                          tittle="Lista dos ativos"
                          description="Ver estacionamentos ativos"
                      />
                   </Paper>
                </Grid>
             </Grid>
          </Container>

          <Container maxWidth="xl" className={classes.content}>
             <HistoryCollapse showHistory={isShowHistory} />
             <ListaCollapse showLista={isShowLista} />
          </Container>

       </>
   );
};

export default UserDetails;