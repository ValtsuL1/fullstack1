import { Link } from "react-router-dom"
import GetTime from "../functions/date/GetTime"
import useComment from "../swr/useComments.tsx"
import './css/Comments.css'

function Comments(props: { userPostId: number }) {
    interface User {
        username: string
        id: number
    }

    const { comments,  isLoading, isError } = useComment(props.userPostId)

    async function DeleteComment(id: number) {
        await fetch(`http://localhost:3000/comment/${id}`, {
            method: 'DELETE',
            headers: {'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            credentials: 'include',
        })
        return true
    }

    if (comments) {
    return (
        <div className="comments-container">
            <table>
                    <tbody>
                        {
                            comments?.map((item: { id: number, content: string, creationDate: string, user: User }) => {
                                if (isLoading) return <p>Loading</p>
                                if (isError) return <p>Error</p>
                                return (
                                    <tr key={item.id}>
                                        <td width={"70%"}>
                                            {item.content}
                                        </td>
                                        <td>
                                            <Link to={`/profile/${item.user.id}`}>
                                            {item.user.username}
                                            </Link>
                                        </td>
                                        <td>
                                            {GetTime(item.creationDate)}
                                        </td>
                                        { Number(localStorage.getItem('user_id')) == item.user.id &&
                                        <td>
                                            <button onClick={() => DeleteComment(item.user.id)} >
                                                Delete
                                            </button>
                                        </td>
                                        } 
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </div>
    )
    }
    else {
        return (
            <div>
                No comments
            </div>
        )
    }
}

export default Comments