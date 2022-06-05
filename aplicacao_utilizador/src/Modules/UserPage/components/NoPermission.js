import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
   },
   icon: {
      fontSize: "10rem",
      marginBottom: theme.spacing(4),
   },
   text: {
      textAlign: "center",
   },
}));

const NoPermission = () => {
   const classes = useStyles();
   let history = useHistory();

   useEffect(() => {
      setTimeout(() => {
         history.push("/");
      }, 3000);
   }, [history]);

   return (
      <>
         <CssBaseline />
         <Container className={classes.root}>
            <ErrorOutlineIcon className={classes.icon} />
            <Typography variant="h5" component="h2" className={classes.text}>
               Precisa de estar autenticado para aceder esta página
            </Typography>
         </Container>
      </>
   );
};

export default NoPermission;
