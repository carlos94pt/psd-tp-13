import React from "react";
import { useLocation } from "react-router-dom";
import NoPermission from "./components/NoPermission";
import BarraNavegacao from "../../Shared/Components/AppBar";
import UserDetails from "./components/UserDetails";
import SaldoCollapse from "./components/SaldoCollapse";

const UserPage = (props) => {
   let isLoggedIn = props.isLoggedIn;
   const isLoading = props.isLoading;
   let location = useLocation();

   if (location.state) {
      isLoggedIn = location.state.isLoggedIn;
   }

   if (isLoading) {
      return <></>;
   }

   if (!isLoggedIn) {
      return <NoPermission />;
   } else {
      return (
         <>
            <BarraNavegacao isLoading={isLoading} isLoggedIn={isLoggedIn} />
            <SaldoCollapse />
            <UserDetails />
         </>
      );
   }
};

export default UserPage;
