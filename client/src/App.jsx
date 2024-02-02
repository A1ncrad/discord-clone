import { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from "react-router-dom";

import Home from './Home';
import Start from './Start';

export default function App() {
  const [loggedIn, setloggedIn] = useState(false);

  return (
		<Router>
			<Routes>
				<Route exact path='/' 
					element={loggedIn ? <Home /> : <Start /> } 
				/>
			</Routes>
		</Router>
  );
}






