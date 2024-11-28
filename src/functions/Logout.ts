

function Logout() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user_id')
    window.location.reload()
}

export default Logout