import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const backgroundImage =
   "https://www.centernorte.com.br/wp-content/uploads/sites/2/2020/01/banner-estacione.jpg";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      height: "80vh",
   },
   container: {
      height: "100%",
      width: "100%",
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      zIndex: -2,
      maxWidth: "100vw",
   },
   backdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "black",
      opacity: 0.5,
      zIndex: -1,
   },
   content: {
      height: "100%",
      zIndex: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
   },
   h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
   },
   icon: {
      height: "75vh",
      position: "absolute",
      display: "flex",
      alignItems: "flex-end",
   },
}));

function LandingContainer() {
   const classes = useStyles();

   return (
      <section className={classes.root}>
         <CssBaseline />
         <Container fixed className={classes.container}>
            <div className={classes.backdrop} />
            <div className={classes.content}>
               {" "}
               <Typography
                  color="inherit"
                  align="center"
                  variant="h2"
                  marked="center"
               >
                  ParkHere
               </Typography>
               <Typography
                  color="inherit"
                  align="center"
                  variant="h5"
                  className={classes.h5}
               >
                  Melhores preços sao aqui!
               </Typography>
            </div>
         </Container>
         <div className={classes.icon}>
            <img
               src="https://material-ui.com/static/themes/onepirate/productHeroArrowDown.png"
               alt="arrow_down"
            />
         </div>
      </section>
   );
}

export default LandingContainer;
