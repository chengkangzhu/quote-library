import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/styles.css";
import { QuoteContextProvider } from "./contexts/QuoteContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<QuoteContextProvider>
			<App />
		</QuoteContextProvider>
	</React.StrictMode>
);
