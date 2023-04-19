import { createContext, useReducer } from "react";

export const QuoteContext = createContext();

const QuoteContextReducer = (state, action) => {
	switch (action.type) {
		case "SET_QUOTES":
			return {
				Quotes: action.payload,
			};
		case "ADD_QUOTE":
			return {
				Quotes: [...state.Quotes, action.payload],
			};
		case "EDIT_QUOTE":
			const editedIndex = state.Quotes.findIndex(
				(q) => q._id === action.payload._id
			);
			if (editedIndex === -1) {
				// Quote not found, return current state
				return state;
			} else {
				const editedQuotes = [...state.Quotes];
				editedQuotes[editedIndex] = action.payload;
				return {
					Quotes: editedQuotes,
				};
			}
		case "DELETE_QUOTE":
			return {
				Quotes: state.Quotes.filter((q) => q._id !== action.payload.id),
			};
		default:
			return state
	}
};

export const QuoteContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(QuoteContextReducer, {
		Quotes: null,
	});

	return (
		<QuoteContext.Provider value={{ ...state, dispatch }}>
			{children}
		</QuoteContext.Provider>
	);
};
