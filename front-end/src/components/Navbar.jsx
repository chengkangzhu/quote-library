import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
	const [ActiveLink, setActiveLink] = useState("generator");
	function handleNavChange(link) {
		setActiveLink(link);
	}

	return (
		<nav
			className="navbar navbar-expand-lg bg-body-tertiary navbar-dark"
			style={{ background: "#555" }}
		>
			<div className="container">
				<span
					className="navbar-brand"
					href="#"
					style={{ marginRight: "50px" }}
				>
					Quotes-Library
				</span>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link
								to="/"
								key={ActiveLink}
								className={`nav-link ${
									ActiveLink === "generator" && "active"
								}`}
								aria-current="page"
								href="#"
								onClick={() => handleNavChange("generator")}
							>
								Generator
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/quoteshelf"
								className={`nav-link ${
									ActiveLink === "quoteshelf" && "active"
								}`}
								href="#"
								onClick={() => handleNavChange("quoteshelf")}
							>
								QuoteShelf
							</Link>
						</li>
					</ul>
					<form className="d-flex">
						<button
							className="btn btn-success me-2"
							type="button"
							// onClick={() => handleNavChange("login")}
						>
							Log In
						</button>
						<button
							class="btn btn-sm btn-outline-light"
							type="button"
							// onClick={() => handleNavChange("signup")}
						>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</nav>
	);
}
