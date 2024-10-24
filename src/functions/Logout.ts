

function Logout() {
    sessionStorage.removeItem('token')
    localStorage.removeItem('user_id')
    window.location.reload()
}

export default Logout