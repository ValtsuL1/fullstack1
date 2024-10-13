import { Link, Navigate } from "react-router-dom"
import useUserposts from "../swr/usePosts"
import { useAuth } from "../auth/AuthProvider"

function Home() {
    const { userposts, isLoading, isError } = useUserposts()

    const auth = useAuth()

    if(auth.token === "") {
        return <Navigate to="/login" />
    }

    console.log(auth.user)

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
                <button>
                    <Link to="/login">Login</Link>
                </button>
            </div>
            <div style={{ backgroundColor: 'gray' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userposts?.map((item: { id: number, title: string }) => {
                                if (isLoading) return <p>Loading</p>
                                if (isError) return <p>Error</p>
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <Link to={`/userpost/${item.id}`}>
                                                {item.title}
                                            </Link>
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