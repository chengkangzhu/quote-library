import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import QuoteList from "./pages/QuoteList";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/quoteshelf" element={<QuoteList />} />
			</Routes>
		</Router>
	);
}
