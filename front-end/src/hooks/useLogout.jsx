
import useAuthContext from './useAuthContext'
import useQuoteContext from './useQuoteContext'

const useLogout = () => {
    const {dispatch}= useAuthContext()
    const {dispatch: quoteDispatch} = useQuoteContext()

    const logout = () =>{
        dispatch({type:"LOGOUT"})
        localStorage.removeItem("user")
        quoteDispatch({type:"SET_QUOTES"})
    }

    return {logout}
}

export default useLogout