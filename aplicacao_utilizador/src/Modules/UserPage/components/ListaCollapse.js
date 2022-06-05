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
    { field: "col2", headerName: "Hora da Entrada", flex: 1 },
    { field: "col3", headerName: "Matricula", flex: 1 },
    { field: "col4", headerName: "Ações", flex: 1 },
];

const ListaCollapse = (props) => {

    const classes = useStyles();
    const [closeHistory, setCloseHistory] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [erro, setErro] = useState(false);
    const [pageSize, setPageSize] = React.useState(10);

    const handlePageSizeChange = (params) => {
        setPageSize(params.pageSize);
    };

    const handleSaida = (aluguerId) => {
        console.log(aluguerId)
        if (aluguerId.value === "Sair") {
            const requestoptions = {
                method: 'POST',
                url: "http://localhost:5000/saida",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                data: {
                    aluguerId: aluguerId.row.id
                }
            }
            axios.request(requestoptions)
            const tempo = rows.filter((item) => item.id !== aluguerId.row.id)
            setRows(tempo)
        }
    }

    useEffect(() => {
        const showLista = props.showLista;
        setCloseHistory(showLista);
        if (showLista) {
            const requestOptions = {
                method: "GET",
                url: "http://localhost:5000/ativos",
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

                        rowsData.push({
                            id: v._id,
                            col1: v.parque.nome,
                            col2: dataEntrada.toUTCString(),
                            col3: v.matricula,
                            col4: "Sair",
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
    }, [props.showLista]);

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
                                onCellClick={handleSaida}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Collapse>
    );
};

export default ListaCollapse;