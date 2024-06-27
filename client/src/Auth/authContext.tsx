import React, { useContext, createContext, useState, useEffect } from "react";

interface AuthContextProps {
    isAuthenticated: boolean;
    token: string | null;
    usuario: string | null;
    Login: (token: string, usuario: string) => void;
    Logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("usuario");
        if (storedToken && storedUser) {
            Login(storedToken, storedUser);
        }
    }, []);

    const Login = (token: string, usuario: string) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", usuario);
        setToken(token);
        setUsuario(usuario);
        setIsAuthenticated(true);
    }

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setToken(null);
        setUsuario(null);
        setIsAuthenticated(false);
    }

    const contextValue: AuthContextProps = {
        isAuthenticated,
        token,
        usuario,
        Login,
        Logout
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}