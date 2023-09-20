import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotIndex from './components/SpotIndex/index'
import { SpotShow } from "./components/SpotShow";
import SpotUpdate from "./components/SpotUpdate";
import NewSpotForm from "./components/NewSpotForm";
import SpotManage from "./components/SpotManage";
import Maps from "./components/Maps/Maps";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      <Switch>
        <Route path='/spots/new' component={NewSpotForm}/>
        <Route path='/spots/current' component={SpotManage}/>
        <Route path='/spots/:spotId/edit' component={SpotUpdate}/>
        <Route path='/spots/:spotId' component={SpotShow}/>
        <Route path='/' component={SpotIndex}/>
      </Switch>
    </>
  );
}

export default App;