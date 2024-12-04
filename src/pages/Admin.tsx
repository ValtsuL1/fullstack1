import { Link } from "react-router-dom"
import { getId, getRole } from "../decoder/decoder"
import useUsers from "../swr/useUsers"

function Admin() {

    const userId = getId()

    const userRole = getRole()

    const { users } = useUsers()

    if(userRole !== "admin") {
        return (
            <div>
                Unauthorized
            </div>
        )
    }

    function GetButtons(item: { id: number, role: string, state: string }) {
        if(item.id == userId) return null

        let banButtonState: string = ""
        if(item.state == 'normal') banButtonState = 'Ban'
        else if(item.state == 'banned') banButtonState = 'Unban'

        let promoteButtonState: string = ""
        if(item.role == 'user') promoteButtonState = 'Promote'
        else if(item.role == 'admin') promoteButtonState = 'Demote'

        return <div>
            <button onClick={() => handleBan(item.id, item.state)}>
                {banButtonState}
            </button>
            <button onClick={() => handlePromote(item.id, item.role)}>
                {promoteButtonState}
            </button>
        </div>
    }

    async function handleBan(id: number, state: string) {
        let banState: string = ""
        if(state == 'normal') banState = 'banned'
        else if(state == 'banned') banState = 'normal'
        await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            credentials: 'include',
            body: JSON.stringify(
                {
                    "state": banState
                }
            )
        })
    }

    async function handlePromote(id: number, role: string) {
        let newRole: string = ""
        if(role == 'admin') newRole = 'user'
        else if(role == 'user') newRole = 'admin'
        await fetch(`http://localhost:3000/user/${id}`, {
            method: 'PATCH',
            headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            credentials: 'include',
            body: JSON.stringify(
                {
                    "role": newRole
                }
            )
        })
    }
        
    return (
        <div>
            <table>
                <thead>
                    <td>
                        Username
                    </td>
                    <td>
                        Role
                    </td>
                    <td>
                        State
                    </td>
                    <td>
                        Actions
                    </td>
                </thead>
                <tbody>
                    {
                        users?.map((item: { id: number, username: string, role: string, state: string }) => {
                            return (
                                <tr key={item.id}>
                                    <td>
                                    <Link to={`/profile/${item.id}`}>
                                        {item.username}
                                    </Link>
                                    </td>
                                    <td>
                                        {item.role}
                                    </td>
                                    <td>
                                        {item.state}
                                    </td>
                                    <td width={"40%"}>
                                        {GetButtons(item)}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Admin