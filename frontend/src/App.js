import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Route } from "react-router-dom";
import SpotIndex from './components/SpotIndex/index'
import { SpotShow } from "./components/SpotShow";

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
        <Route path='/api/spots/current' />
        <Route path='/api/reviews/current' />
        <Route path='/api/bookings/current' />
        <Route path='/api/bookings/:bookingId' />
        <Route path='/api/spot-images/:imageId' />
        <Route path='/api/review-images/:imageId' />
        <Route path='/api/reviews/:reviewId/images' />
        <Route path='/api/spots/:spotId/reviews' />
        <Route path='/api/spots/:spotId/bookings' />
        <Route path='/api/reviews/:reviewId' />
        <Route path='/api/spots/:spotId/images' />
        <Route path='/api/spots/:spotId' component={SpotShow}/>
        <Route path='/api/spots' component={SpotIndex}/>
      </Switch>
    </>
  );
}

export default App;