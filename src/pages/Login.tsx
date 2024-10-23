import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement
        password: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.password !== "" && input.email !== "") {
                await fetch("http://localhost:3000/auth/login", {
                    method: 'POST',
                    headers: {'content-Type': 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify(
                        {
                            "email": input.email,
                            "password": input.password
                        }
                    )
                }).then(res => res.json()).then(res => {
                    sessionStorage.setItem('token', res.access_token)
                    localStorage.setItem('user_id', res.user_id)
                })
                navigate(-1)
                return true 
                
        }
        alert("input not valid")
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleInput}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleInput}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <button>
                <Link to={"/"}>Home</Link>
            </button>
        </div>
    )
}

export default Login