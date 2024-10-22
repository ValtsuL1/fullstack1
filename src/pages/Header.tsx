import { Link } from "react-router-dom";
import Logout from "../functions/Logout";
import useUser from "../swr/useUser";

function Header() {
    const { user } = useUser(Number(localStorage.getItem('user_id')))

    return (
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
                { sessionStorage.getItem('token') && user &&
                    user.username
                }
                { sessionStorage.getItem('token') &&
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
    )
}

export default Header