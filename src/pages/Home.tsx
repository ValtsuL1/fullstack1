import { Link } from "react-router-dom"
import useUserposts from "../swr/usePosts"
import Logout from "../Logout"

function Home() {
    const { userposts, isLoading, isError } = useUserposts()

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1>
                    Fullstack1
                </h1>
                <div style={{
                    justifyContent: 'right'
                }}>
                    { sessionStorage.getItem('token')?.length &&
                        <button onClick={Logout}>
                            Logout
                        </button>
                    }
                    { !sessionStorage.getItem('token') &&
                        <button>
                            <Link to="/login">Login</Link>
                        </button>
                    }
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                </div>
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
                                        <td>
                                            <Link to={`/userpost/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td>
                                            {item.creationDate}
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