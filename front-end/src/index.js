import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/styles.css";

//context
import { QuoteContextProvider } from "./contexts/QuoteContext";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<QuoteContextProvider>
				<App />
			</QuoteContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
