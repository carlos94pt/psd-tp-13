import React from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function LoginPage(props) {
    const isLoggedIn = props.isLoggedIn;
    const isLoading = props.isLoading;

    if (isLoading) {
        return <></>;
    }

    if (isLoggedIn) {
        return <Redirect to="/" />;
    } else {
        return <LoginForm />;
    }
}

export default LoginPage;