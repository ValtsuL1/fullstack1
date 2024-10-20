

function Logout() {
    sessionStorage.removeItem('token')
    window.location.reload()
}

export default Logout