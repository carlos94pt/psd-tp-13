import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import icon from "../../../static/virar.svg";
import variedade from "../../../static/variedade.svg";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      overflow: "hidden",
      backgroundColor: "#fff5f8",
   },
   container: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(20),
      display: "flex",
      position: "relative",
   },
   item: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 5),
   },
   image: {
      height: 55,
   },
   title: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
   },
   curvyLines: {
      pointerEvents: "none",
      position: "absolute",
      top: -180,
   },
}));

function ServiceDetails() {
   const classes = useStyles();

   return (
      <section className={classes.root}>
         <Container className={classes.container}>
            <img
               src="https://material-ui.com/static/themes/onepirate/productCurvyLines.png"
               className={classes.curvyLines}
               alt="curvy lines"
            />
            <Grid container spacing={5}>
               <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                     <img
                        className={classes.image}
                        src="https://material-ui.com/static/themes/onepirate/productValues3.svg"
                        alt="suitcase"
                     />
                     <Typography variant="h5" className={classes.title}>
                        Preços
                     </Typography>
                     <Typography variant="h6">
                        Melhores preços na zona do Porto!
                     </Typography>
                  </div>
               </Grid>
               <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                     <img className={classes.image} src={icon} alt="graph" />
                     <Typography variant="h5" className={classes.title}>
                        Flexibiliade
                     </Typography>
                     <Typography variant="h6">
                        Pode pegar um veiculo numa zona e entregar noutra!
                     </Typography>
                  </div>
               </Grid>
               <Grid item xs={12} md={4}>
                  <div className={classes.item}>
                     <img
                        className={classes.image}
                        src={variedade}
                        alt="clock"
                     />
                     <Typography variant="h5" className={classes.title}>
                        Variedade
                     </Typography>
                     <Typography variant="h6">
                        Vários tipos de veiculos para diversas situações
                     </Typography>
                  </div>
               </Grid>
            </Grid>
         </Container>
      </section>
   );
}

export default ServiceDetails;
