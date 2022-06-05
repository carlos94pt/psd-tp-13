import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      overflow: "hidden",
      backgroundColor: "#fff5f8",
   },
   container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
   },
   item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 5),
   },
   title: {
      marginBottom: theme.spacing(14),
   },
   number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
   },
   image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
   },
   curvyLines: {
      pointerEvents: "none",
      position: "absolute",
      top: -180,
   },
   icon: {
      fontSize: "6rem",
      zIndex: 1,
   },
}));
const HowTo = () => {
   const classes = useStyles();

   return (
      <section className={classes.root}>
         <Container className={classes.container}>
            <img
               src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
               className={classes.curvyLines}
               alt="curvy lines"
            />
            <Typography variant="h5" className={classes.title} component="h2">
               Como usar um dos nossos parques?
            </Typography>
            <div>
               <Grid container spacing={5}>
                  <Grid item xs={12} md={4}>
                     <div className={classes.item}>
                        <div className={classes.number}>1.</div>
                        <SupervisorAccountIcon className={classes.icon} />
                        <Typography variant="h6" align="center">
                           Inicie sessão na sua conta ou então crie uma
                        </Typography>
                     </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <div className={classes.item}>
                        <div className={classes.number}>2.</div>
                        <DriveEtaIcon className={classes.icon} />
                        <Typography variant="h6" align="center">
                           Escolha o parque onde quer estacionar e levar o seu carro até lá
                        </Typography>
                     </div>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <div className={classes.item}>
                        <div className={classes.number}>3.</div>
                        <EmojiTransportationIcon className={classes.icon} />
                        <Typography variant="h6" align="center">
                           Indicar o parque onde tem o carro estacionado e a matrícula do mesmo e retirar o carro
                        </Typography>
                     </div>
                  </Grid>
               </Grid>
            </div>
         </Container>
      </section>
   );
};

export default HowTo;
