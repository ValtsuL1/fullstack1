import { Link, useParams } from "react-router-dom"
import useUser from "../swr/useUser"
import Header from "./Header"
import FormatDate from "../functions/date/FormatDate"
import { useState } from "react"
import useProfilePosts from "../swr/useProfilePosts"
import GetTime from "../functions/date/GetTime"
import useProfileComments from "../swr/useProfileComments"

function Profile() {
    let { id } = useParams()

    const { user } = useUser(Number(id))
    
    const [showPosts, setShowPosts] = useState(true)

    const { userposts, isLoading: isLoadingPosts, isError: isErrorPosts } = useProfilePosts(Number(id))

    const { comments, isLoading: isLoadingComments, isError: isErrorComments } = useProfileComments(Number(id))

    if (user) {
    return (
        
        <div>
            <Header></Header>
            <div>
                <h1>
                    {user.username}
                </h1>
                <h2>
                   Created on: {FormatDate(user.creationDate)}
                </h2>
            </div>
            <div>
                <button onClick={() => setShowPosts(true)}>Posts</button>
                <button onClick={() => setShowPosts(false)}>Comments</button>
            </div>
            <div>
            { showPosts &&
                <div>
                    <table>
                            <tbody>
                                {
                                    userposts?.map((item: { id: number, title: string, creationDate: string }) => {
                                        if (isLoadingPosts) return <p>Loading</p>
                                        if (isErrorPosts) return <p>Error</p>
                                        return (
                                            <tr key={item.id}>
                                                <td width={"90%"}>
                                                    <Link to={`/userpost/${item.id}`}>
                                                        {item.title}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {GetTime(item.creationDate)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                </div>
            }
            </div>
            <div>
            { !showPosts &&
                <table>
                        <tbody>
                            {
                                comments?.map((item: { id: number, content: string, creationDate: string }) => {
                                    if (isLoadingComments) return <p>Loading</p>
                                    if (isErrorComments) return <p>Error</p>
                                    return (
                                        <tr key={item.id}>
                                            <td width={"90%"}>
                                                {item.content}
                                            </td>
                                            <td>
                                                {GetTime(item.creationDate)}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
            }
            </div>
        </div>
    )
    }
}

export default Profile