import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Home from './Home';
import Start from './Start';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={loggedIn ? <Home /> : <Navigate replace to="start" />}
        />
        <Route
          exact
          path="start/*"
          element={
            loggedIn ? (
              <Navigate replace to="/" />
            ) : (
              <Start setLoggedIn={setLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}
