import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
   toolbar: {
      justifyContent: "space-between",
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },
   title: {
      cursor: "pointer",
      flex: 1,
      textAlign: "left",
   },
   skeleton: {
      width: "8rem",
   },
}));

function BarraNavegacao(props) {
   const isLoggedIn = props.isLoggedIn;
   const isLoading = props.isLoading;

   const classes = useStyles();
   let history = useHistory();

   const handleLogin = () => {
      history.push("/login");
   };

   const handleRegistar = () => {
      history.push("/registar");
   };

   const handleLogOut = () => {
      localStorage.removeItem("token");
      history.push({
         pathname: "/",
         state: {
            isLoggedIn: false,
         },
      });
   };

   const handleUserPage = () => {
      history.push({
         pathname: "/user",
         state: {
            isLoggedIn: isLoggedIn,
         },
      });
   };

   const handleHomePage = () => {
      history.push({
         pathname: "/",
         state: {
            isLoggedIn: isLoggedIn,
         },
      });
   };

   return (
      <div className={classes.root}>
         <AppBar position="static">
            <Toolbar className={classes.toolbar}>
               <Typography
                  variant="h6"
                  className={classes.title}
                  onClick={handleHomePage}
               >
                  ParkHere
               </Typography>

               {isLoading ? (
                  <Skeleton className={classes.skeleton} animation="wave" />
               ) : (
                  <>
                     {isLoggedIn ? (
                        <>
                           <Button color="inherit" onClick={handleUserPage}>
                              Área de utilizador
                           </Button>
                           <IconButton color="inherit" onClick={handleLogOut}>
                              <ExitToAppIcon />
                           </IconButton>
                        </>
                     ) : (
                        <>
                           <Button color="inherit" onClick={handleLogin}>
                              Login
                           </Button>
                           <Button color="inherit" onClick={handleRegistar}>
                              Registar
                           </Button>
                        </>
                     )}
                  </>
               )}
            </Toolbar>
         </AppBar>
      </div>
   );
}

export default BarraNavegacao;
