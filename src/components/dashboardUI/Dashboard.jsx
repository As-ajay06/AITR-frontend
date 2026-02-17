import { createContext, useEffect, useState } from "react"
import { BASE_URL } from "../../../config/config"
import { useNavigate } from "react-router-dom";


// this provide the role and department value to all the children under it.
export const AuthContext = createContext();


export default function Dashboard({ children }) {

    const [auth, setAuth] = useState()
    // todo : run a useEffect on mount. to check if the user is authenticated or not.


    const navigate = useNavigate();

    async function verifyTokenFromServer(token) {
        const res = await fetch(`${BASE_URL}/api/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        return res.json();
    }



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        } else {
            verifyTokenFromServer(token).then(res => {
                console.log('this ', res);
                if (res.valid) {
                    setAuth({
                        ...res,
                        loading: false
                    })
                } else {
                    localStorage.removeItem("token");
                    setAuth((prev) => ({ ...prev, loading: false }));
                    navigate('/login');
                }
            });
        }
    }, []);


    return (
        <AuthContext.Provider value={auth}>
            <div>
                {children}
            </div>
        </AuthContext.Provider>
    )

}