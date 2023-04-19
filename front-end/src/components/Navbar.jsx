import React from "react";
import { Link,useLocation } from "react-router-dom";

//hooks
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

export default function Navbar(props) {
	const { logout } = useLogout();
	const { user } = useAuthContext();
	const location = useLocation();



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
								className={`nav-link ${location.pathname === "/" && "active"}`}
							>
								Generator
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/quoteshelf"
								className={`nav-link ${location.pathname === "/quoteshelf" && "active"}`}
							>
								QuoteShelf
							</Link>
						</li>
					</ul>
					<form className="d-flex">
						{user ? (
							<div>
							{user.email && <span className=" me-2 text-success">{user.email}</span>}
								<button
									className="btn btn-outline-light me-2"
									onClick={() => logout()}
								>
									Logout
								</button>
							</div>
						) : (
							<div>
								<Link
									to="/login"
									className="btn btn-success me-2"
								>
									Log In
								</Link>

								<Link
									to="/signup"
									className="btn  btn-outline-light "
								>
									Sign Up
								</Link>
							</div>
						)}
					</form>
				</div>
			</div>
		</nav>
	);
}
