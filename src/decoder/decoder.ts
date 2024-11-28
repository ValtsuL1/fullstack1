import { jwtDecode, JwtPayload } from "jwt-decode";

interface PayLoad extends JwtPayload {
    id: number
    role: string
}

export function getId() {
    if (sessionStorage.getItem('token') == null) {
        return null
    }
    const decodedToken = jwtDecode<PayLoad>(sessionStorage.getItem('token') || "")
    return decodedToken.id
}

export function getRole() {
    if (sessionStorage.getItem('token') == null) {
        return null
    }
    const decodedToken = jwtDecode<PayLoad>(sessionStorage.getItem('token') || "")
    return decodedToken.role
}