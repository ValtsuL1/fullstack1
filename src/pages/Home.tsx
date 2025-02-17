import { Link } from "react-router-dom"
import useUserposts from "../swr/usePosts"
import GetTime from "../functions/date/GetTime"
import Header from "./Header"
import { getState } from "../decoder/decoder"

function Home() {
    const userState = getState()

    interface User {
        username: string
        id: number
    }

    const { userposts, isLoading, isError } = useUserposts()

    function showButtons() {
        if (sessionStorage.getItem('token') && userState == 'normal') {
            return <div style={{ padding: '1%' }}>
                <Link to="/create">
                    <button>
                        Create post
                    </button>
                </Link>
                <Link to="/chat">
                    <button>
                        Chatroom
                    </button>
                </Link>
            </div>
        }
        else if(userState == 'banned') {
            return <div style={{ color: "red" }}>
                Banned from posting
            </div>
        }
    }

    return (
        <div>
            <div>
                <Header></Header>
                {showButtons()}
            </div>
            <div>
                <table>
                    <tbody>
                        {
                            userposts?.map((item: { id: number, title: string, creationDate: string, user: User }) => {
                                if (isLoading) return <p>Loading</p>
                                if (isError) return <p>Error</p>
                                return (
                                    <tr key={item.id}>
                                        <td width={"80%"} style={{ fontSize: '1.5em' }}>
                                            <Link to={`/userpost/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td>
                                            <div>
                                                Created by:{' '}
                                                <Link to={`profile/${item.user.id}`}>
                                                    {item.user.username}
                                                </Link>
                                            </div>
                                            <div>
                                                {GetTime(item.creationDate)}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home