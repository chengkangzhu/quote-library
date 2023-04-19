import { useContext } from "react";
import { QuoteContext } from "../contexts/QuoteContext";


const useQuoteContext = () => {
    const context = useContext(QuoteContext)
    if(!context){
        throw Error ("useQuoteContext must be used inside of a Quotecontext.provider")
    }

    return context
}

export default useQuoteContext