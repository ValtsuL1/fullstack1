import { Link } from "react-router-dom"
import useUserposts from "../swr/usePosts"

function Home() {
    //const userposts: Array<{ id: number, title: string }> = useUserposts().userposts

    const { userposts, isLoading, isError } = useUserposts()
    
    console.log(userposts)

    /*
    try {
        userposts?.map((item: { id: number, title: string }) => {
            if (isLoading) return <p>Loading</p>
            if (isError) return <p>Error</p>
            return (
                <tr key={item.id}>
                    <td>{item.title}</td>
                </tr>
            )
        })

    } catch (error) {
        console.log(error)
    }*/
    
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