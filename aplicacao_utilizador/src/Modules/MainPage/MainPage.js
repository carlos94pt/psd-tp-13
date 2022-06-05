import "../../App.css";
import React from "react";
import BarraNavegacao from "../../Shared/Components/AppBar";
import LandingContainer from "./components/LandingContainer";
import VehicleTabel from "./components/VehicleTabel";
import HowTo from "./components/HowTo";
import AppFooter from "./components/AppFooter";
import { useLocation } from "react-router-dom";

function MainPage(props) {
   let isLoggedIn = props.isLoggedIn;
   let isLoading = props.isLoading;
   let location = useLocation();

   if (location.state) {
      isLoggedIn = location.state.isLoggedIn;
   }

   return (
      <div className="App">
         <BarraNavegacao isLoading={isLoading} isLoggedIn={isLoggedIn} />
         <LandingContainer />
         <VehicleTabel />
         <AppFooter />
      </div>
   );
}

export default MainPage;
