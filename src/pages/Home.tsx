import { Link } from "react-router-dom"
import useUserposts from "../swr/usePosts"
import Logout from "../functions/Logout"
import GetTime from "../functions/date/GetTime"
import Header from "./Header"

function Home() {
    const { userposts, isLoading, isError } = useUserposts()

    return (
        <div>
            <div>
                <Header></Header>
                { sessionStorage.getItem('token') &&
                <button>
                    <Link to="/create">Create post</Link>
                </button>
            }
            </div>
            <div style={{ backgroundColor: 'gray' }}>
                <table>
                    <tbody>
                        {
                            userposts?.map((item: { id: number, title: string, creationDate: string }) => {
                                if (isLoading) return <p>Loading</p>
                                if (isError) return <p>Error</p>
                                return (
                                    <tr key={item.id}>
                                        <td width={"80%"}>
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
        </div>
    )
}

export default Home