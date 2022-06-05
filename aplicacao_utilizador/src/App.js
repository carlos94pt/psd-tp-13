import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./Modules/MainPage/MainPage";
import LoginPage from "./Modules/LoginPage/LoginPage";
import RegisterPage from "./Modules/RegisterPage/RegisterPage";
import UserPage from "./Modules/UserPage/UserPage";
import axios from "axios";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchApi = async () => {
                const requestOptions = {
                    method: "GET",
                    url: "http://localhost:8080/verificarToken",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios
                    .request(requestOptions)
                    .then((response) => {
                        setLoggedIn(true);
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoggedIn(false);
                        setLoading(false);
                    });
            };
            fetchApi();
        } else {
            setLoggedIn(false);
            setLoading(false);
        }
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <LoginPage isLoggedIn={isLoggedIn} isLoading={isLoading} />
                </Route>
                <Route exact path="/registar">
                    <RegisterPage isLoggedIn={isLoggedIn} isLoading={isLoading} />
                </Route>
                <Route exact path="/user">
                    <UserPage loggedIn={isLoggedIn} />
                </Route>
                <Route exact path="/">
                    <MainPage isLoading={isLoading} isLoggedIn={isLoggedIn} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
