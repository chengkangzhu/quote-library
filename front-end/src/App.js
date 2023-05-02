import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

//components & pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuoteList from "./pages/QuoteList";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//context
import useAuthContext from "./hooks/useAuthContext";


export default function App() {
	const { user } = useAuthContext();

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route
					path="/quoteshelf"
					element={user ? <QuoteList /> : <Navigate to="/login" />}
				/>
				<Route
					path="/signup"
					element={!user ? <Signup /> : <Navigate to="/" />}
				/>
				<Route
					path="/login"
					element={!user ? <Login /> : <Navigate to="/quoteshelf" />}
				/>
			</Routes>
		</Router>
	);
}
