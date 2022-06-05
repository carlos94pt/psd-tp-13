import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import MoneyIcon from "@material-ui/icons/Money";
import HistoryIcon from "@material-ui/icons/History";

const useStyles = makeStyles((theme) => ({
   imageItem: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
   },
   icon: {
      fontSize: "8rem",
   },
}));

const ActionButton = (props) => {
   const classes = useStyles();
   const tittle = props.tittle;
   const description = props.description;

   return (
       <Grid container spacing={2}>
          <Grid item className={classes.imageItem}>
             {tittle === "Perfil" ? (
                 <PersonIcon className={classes.icon} />
             ) : (
                 <></>
             )}
             {tittle === "Lista dos ativos" ? (
                 <MoneyIcon className={classes.icon} />
             ) : (
                 <></>
             )}
             {tittle === "Histórico" ? (
                 <HistoryIcon className={classes.icon} />
             ) : (
                 <></>
             )}
          </Grid>
          <Grid item xs={12} container>
             <Grid item xs container direction="column">
                <Grid item xs>
                   <Typography gutterBottom variant="subtitle1">
                      {tittle}
                   </Typography>
                   <Typography variant="body2" gutterBottom>
                      {description}
                   </Typography>
                </Grid>
             </Grid>
          </Grid>
       </Grid>
   );
};

export default ActionButton;