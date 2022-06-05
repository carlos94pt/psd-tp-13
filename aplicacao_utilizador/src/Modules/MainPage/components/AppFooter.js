import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CopyrightIcon from "@material-ui/icons/Copyright";

const useStyles = makeStyles((theme) => ({
   container: {
      display: "flex",
      flexDirection: "column",
      height: "20vh",
      marginTop: theme.spacing(8),
   },
   copyRight: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
   },
   icons: {
      display: "flex",
      fill: "#fff5f8",
   },
   icon: {
      fontSize: "3rem",
      marginRight: theme.spacing(1),
   },
   list: {
      margin: 0,
      listStyle: "none",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
   },
   listItem: {
      paddingTop: theme.spacing(0.1),
   },
}));

const AppFooter = () => {
   const classes = useStyles();
   return (
      <Typography component="footer">
         <Container className={classes.container}>
            <Typography
               variant="body2"
               component="h2"
               className={classes.copyRight}
            >
               <CopyrightIcon /> Desenvolvido por Carlos Garcia e José Alves.
            </Typography>
         </Container>
      </Typography>
   );
};

export default AppFooter;
