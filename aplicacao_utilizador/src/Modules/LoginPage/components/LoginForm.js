import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    erro: {
        marginTop: theme.spacing(2),
    },
}));

const LoginForm = () => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState("");
    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            url: "http://localhost:5000/login",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            data: {
                username: username,
                password: password,
            },
        };

        axios
            .request(requestOptions)
            .then((res) => {
                localStorage["token"] = res.data.token;
                history.push({
                    pathname: "/",
                    state: {
                        isLoggedIn: true,
                    },
                });
            })
            .catch((err) => {
                setErro(true);
                setErroMessage(err.response.data.message);
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar Sessão
                </Typography>

                <Collapse in={erro} className={classes.erro}>
                    <Alert
                        variant="filled"
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErro(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {erroMessage}
                    </Alert>
                </Collapse>

                <form
                    className={classes.form}
                    validate="true"
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Iniciar sessão
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/registar" variant="body2">
                                {"Não tem uma conta? Registar"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default LoginForm;
