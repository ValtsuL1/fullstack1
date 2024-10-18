import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginType = {
    email: string
    password: string
    //remember: boolean | undefined
}

interface ProviderProps {
    user: string | null
    token: string,
    login (data: LoginType): void,
    logout(): void,
}

const AuthContext = createContext<ProviderProps>({
    user: null,
    token: '',
    login: () => {},
    logout: () => {}
})

export const randomToken = (length: number) => {
    let s = ''
    Array.from({ length }).some(() => {
        s += Math.random().toString(36).slice(2)
        return s.length >= length
    })
    return s.slice(0, length)
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null
    const [user, setUser] = useState<string | null>(storedInfo?.email || '')
    const [token, setToken] = useState(storedInfo?.token || '')
    const navigate = useNavigate()

    const login = (data: LoginType) => {
        const t = randomToken(60)
        setTimeout(() => {
            const obj = {...data, token: t}
            setUser(data.email)
            setToken(t)
            localStorage.setItem('user', JSON.stringify(obj))
            navigate('/')
        }, 1000)
    }

    const logout = () => {
        setUser(null)
        setToken('')
        localStorage.removeItem('user')
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer" + token
            localStorage.setItem('token', token)
        } else {
            delete axios.defaults.headers.common["Authorization"]
            localStorage.removeItem('token')
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}