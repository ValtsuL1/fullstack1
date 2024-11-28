import { Link } from "react-router-dom";
import Logout from "../functions/Logout";
import useUser from "../swr/useUser";
import { getId } from "../decoder/decoder";

function Header() {
    const userId = getId()
    
    const { user } = useUser(Number(userId))

    console.log("test")

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Link to="/">
                <h1>
                    Fullstack1
                </h1>
            </Link>

            <div style={{
                justifyContent: 'right'
            }}>
                {sessionStorage.getItem('token') && user &&
                    <p>Logged in as:{' '}
                        <Link to={`/profile/${userId}`}>
                            {user.username}
                        </Link>
                    </p>
                }

                {sessionStorage.getItem('token') &&
                    <button onClick={Logout}>
                        Logout
                    </button>
                }
                {!sessionStorage.getItem('token') &&
                    <Link to="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                }
                <Link to="/register">
                    <button>
                        Register
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Header