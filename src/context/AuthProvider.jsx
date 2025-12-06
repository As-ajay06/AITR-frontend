//  this file will just get me the token and setUser
import { useNavigation } from "react-router-dom";
import { createContext , useContext, useState, useEffect } from 'react';
import { AuthContext } from "./AuthContext";


export function AuthProvider ({ children }) {
    
    const [authorization , setAuthorization] = useState(false);

    const [user , setUser] = useState(null);
    const [token , setToken] = useStatee(null);
    const [loading , setLoading ] = useState(true);
    
    const navigate = useNavigation()


    const getToken = async () => {

        // const url = 'http://localhost:3000/api/auth/verify'
        // await fetch(url, {
        //     method: POST,
        //     body:{
        //         email: email,
        //         password: password
        //     }
        // });

        const existingToken = localStorage.getItem('token');

        return existingToken;
    }

    useEffect(() => {
        let existingToken = getToken();
        if(existingToken){
            setToken(existingToken);

            // fetch user profile using token
        }

        setLoading(false);
    },[])


    // get credentials or login fucntion
    const credential = async ( email, password ) => {
        try{
            res = await loginApi( email, password );
            const userData = res.data;
            const token = res.token;
            
            setToken(token)
            setUser(user)
            
            return { success : true }
        }catch(err){
            return { success: false , message: err.res?.data?.message || "Login failed"}
        }
    }

    const logout = () => {
        setUser(null);
        //  remove token
        localStorage.removeItem(token);
    }

    const value = {
        logout,
        token,
        userData,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}