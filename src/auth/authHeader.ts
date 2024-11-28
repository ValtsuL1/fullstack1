export default function authHeader() {
    const token = localStorage.getItem('token')
    let user = null;
    if (token) {
        user = JSON.parse(token)
    }

    if (user && token) {
        return { Authorization: 'Bearer' + user }
    }
    else {
        return { Authorization: '' }
    }
}
