import { Link } from "react-router-dom"
import useUserposts from "../swr/usePosts"
import useUserpost from "../swr/usePost"
import useUser from "../swr/useUser"

function Home() {
    console.log(useUser(1))

    

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
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home