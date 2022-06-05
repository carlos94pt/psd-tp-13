import React from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";

function RegisterPage(props) {
   const isLoggedIn = props.isLoggedIn;
   const isLoading = props.isLoading;

   if (isLoading) {
      return <></>;
   }

   if (isLoggedIn) {
      return <Redirect to="/" />;
   } else {
      return <RegisterForm />;
   }
}

export default RegisterPage;
