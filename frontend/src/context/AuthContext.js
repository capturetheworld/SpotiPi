import { createContext } from "react";

const AuthContext = createContext({
    code:'',
    accessToken: '', 
    refreshToken: '', 
    expiresIn: '',
    setCode: () => {},
    setAccessToken:() => {}, 
    setRefreshToken:() => {}, 
    setExpiresIn:() => {}
})

export default AuthContext