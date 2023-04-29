import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, SetIsLoading] = useState(null);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		SetIsLoading(true);
		setError(null);

		try {
			const response = await axios.post("https://quote-library-2-production.up.railway.app/api/user/login",{ email, password });
			localStorage.setItem("user", JSON.stringify(response.data));    
			dispatch({ type: "LOGIN", payload: response.data });
			SetIsLoading(false);
		} catch (error) {
			setError(error.response.data.error);
			SetIsLoading(false);
		}
	};

	return { login, isLoading, error };
};

export default useLogin;
