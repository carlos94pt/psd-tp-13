import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataGrid } from "@material-ui/data-grid";
import ErrorIcon from "@material-ui/icons/Error";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
   root: {
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(8),
   },
   tittle: { margin: theme.spacing(5) },
   errorIcon: {
      fontSize: "4rem",
   },
}));

const columns = [
   { field: "col1", headerName: "Nome", flex: 1 },
   { field: "col2", headerName: "Rua", flex: 1 },
   { field: "col3", headerName: "Lotação", flex: 1 },
   { field: "col4", headerName: "Latitude", flex: 1 },
   { field: "col5", headerName: "Longitude", flex: 1 },
];

const VehicleTabel = (props) => {
   const classes = useStyles();
   const [isLoading, setIsLoading] = useState(true);
   const [erro, setErro] = useState(false);
   const [rows, setRows] = useState([]);

   useEffect(() => {
      const requestOptions = {
         method: "GET",
         url: "http://localhost:5000/parques",
      };
      axios
         .request(requestOptions)
         .then((response) => {
            const rowsData = [];
            response.data.forEach((v, index) => {
               rowsData.push({
                  id: index,
                  col1: v.nome,
                  col2: v.rua,
                  col3: v.lotacao,
                  col4: v.latitude,
                  col5: v.longitude,
               });
            });
            setRows(rowsData);
            setIsLoading(false);
         })
         .catch((error) => {
            setIsLoading(false);
            setErro(true);
            console.log(error);
         });
   }, []);

   if (isLoading) {
      return (
         <section className={classes.root}>
            <CssBaseline />
            <Container>
               <CircularProgress />
               <Typography variant="h6">
                  A encontrar parquess disponiveis...
               </Typography>
            </Container>
         </section>
      );
   }

   if (erro) {
      return (
         <section className={classes.root}>
            <CssBaseline />
            <Container>
               <ErrorIcon className={classes.errorIcon} />
               <Typography variant="h6">
                  Ocorreu um erro a encontrar a lista de parques
               </Typography>
            </Container>
         </section>
      );
   }
   return (
      <section className={classes.root}>
         <CssBaseline />
         <Container>
            <Typography variant="h5" marked="center" className={classes.tittle}>
               Parques disponiveis
            </Typography>
            <div style={{ height: 300, width: "100%" }}>
               <div style={{ display: "flex", height: "100%" }}>
                  <div style={{ flexGrow: 1 }}>
                     <DataGrid
                        rows={rows}
                        columns={columns}
                        rowsPerPageOptions={[10, 15, 20]}
                     />
                  </div>
               </div>
            </div>
         </Container>
      </section>
   );
};

export default VehicleTabel;
