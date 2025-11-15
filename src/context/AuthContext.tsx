"use client"
import { createContext, use, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({children} : {children : React.ReactNode}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    },[])

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }
    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context
}