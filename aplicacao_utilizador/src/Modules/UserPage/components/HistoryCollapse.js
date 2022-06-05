import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import CircularProgress from "@material-ui/core/CircularProgress";

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
   loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
   },
}));

const columns = [
   { field: "col1", headerName: "Parque", flex: 1 },
   { field: "col2", headerName: "Entrada", flex: 1 },
   { field: "col3", headerName: "Saida", flex: 1 },
   { field: "col4", headerName: "Veículo", flex: 1 },
   { field: "col5", headerName: "Preço", flex: 1 },
];

const HistoryCollapse = (props) => {
   const classes = useStyles();
   const [closeHistory, setCloseHistory] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [rows, setRows] = useState([]);
   const [erro, setErro] = useState(false);
   const [pageSize, setPageSize] = React.useState(10);

   const handlePageSizeChange = (params) => {
      setPageSize(params.pageSize);
   };

   useEffect(() => {
      const showHistory = props.showHistory;
      setCloseHistory(showHistory);
      if (showHistory) {
         const requestOptions = {
            method: "GET",
            url: "http://localhost:5000/historico",
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
         };
         axios
             .request(requestOptions)
             .then((response) => {
                const rowsData = [];
                response.data.forEach((v, index) => {
                   var dataEntrada = new Date(v.horaInicio);
                   var dataSaida = new Date(v.horaFim);
                   console.log(v.valorFinal.$numberDecimal);

                   rowsData.push({
                      id: index,
                      col1: v.parque.nome,
                      col2: dataEntrada.toUTCString(),
                      col3: dataSaida.toUTCString(),
                      col4: v.matricula,
                      col5: v.valorFinal + "€",
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
      }
   }, [props.showHistory]);

   const handleClose = () => {
      setCloseHistory(false);
   };

   return (
       <Collapse in={closeHistory}>
          <div className={classes.header}>
             <Typography variant="h6" component="h3">
                Histórico
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

          {isLoading ? (
              <div className={classes.loading}>
                 <CircularProgress />
              </div>
          ) : (
              <div
                  style={{
                     height: 300,
                     width: "100%",
                     marginTop: "3rem",
                     marginBottom: "3rem",
                  }}
              >
                 <div style={{ display: "flex", height: "100%" }}>
                    <div style={{ flexGrow: 1 }}>
                       <DataGrid
                           rows={rows}
                           columns={columns}
                           pageSize={pageSize}
                           onPageSizeChange={handlePageSizeChange}
                           rowsPerPageOptions={[10, 20, 25]}
                           pagination
                       />
                    </div>
                 </div>
              </div>
          )}
       </Collapse>
   );
};

export default HistoryCollapse;