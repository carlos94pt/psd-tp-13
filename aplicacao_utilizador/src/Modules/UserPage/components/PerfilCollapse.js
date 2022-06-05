import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";

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
}));

const PerfilCollapse = (props) => {
   const classes = useStyles();
   const [closePerfil, setClosePerfil] = useState(false);

   useEffect(() => {
      setClosePerfil(props.showPerfil);
   }, [props.showPerfil]);

   const handleClose = () => {
      setClosePerfil(false);
   };

   return (
      <Collapse in={closePerfil}>
         <div className={classes.header}>
            <Typography variant="h6" component="h3">
               Perfil
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
      </Collapse>
   );
};

export default PerfilCollapse;
