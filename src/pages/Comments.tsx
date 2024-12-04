import { Link } from "react-router-dom"
import GetTime from "../functions/date/GetTime"
import useComment from "../swr/useComments.tsx"
import './css/Comments.css'
import { getId, getRole, getState } from "../decoder/decoder.ts"

function Comments(props: { userPostId: number }) {
    interface User {
        username: string
        id: number
    }

    const userId = getId()
    const userRole = getRole()
    const userState = getState()

    function GetButtons(id: number) {
        if (userId == id && userState == 'banned') {
            return <div style={{ color: "red" }}>
                Banned from commenting
            </div>
        }
        if (userId == id || userRole == 'admin') {
            return <div className="comment-buttons">
                <button onClick={() => DeleteComment(id)} >
                    Delete
                </button>
                <Link to={`/userpost/${props.userPostId}/comment/${id}`}>
                    <button>
                        Update
                    </button>
                </Link>
            </div>
        }
        else return null
    }

    const { comments, isLoading, isError } = useComment(props.userPostId)

    async function DeleteComment(id: number) {
        await fetch(`http://localhost:3000/comment/${id}`, {
            method: 'DELETE',
            headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
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
                                        <td className="comment-info">
                                            <div>
                                                <p style={{ lineHeight: '0' }}>
                                                    Created by:{' '}
                                                    <Link to={`/profile/${item.user.id}`}>
                                                        {item.user.username}
                                                    </Link>
                                                </p>
                                            </div>
                                            <div>
                                                {GetTime(item.creationDate)}
                                            </div>
                                            <div>
                                                {GetButtons(item.user.id)}
                                            </div>
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
    else {
        return (
            <div>
                No comments
            </div>
        )
    }
}

export default Comments