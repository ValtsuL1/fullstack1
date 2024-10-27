import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import GetDate from "../functions/date/GetDate"
import './css/Register.css'

function Register() {

    const navigate = useNavigate()

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement
        password: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: "",
        passwordR: "",
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.password === input.passwordR) {
            await fetch("http://localhost:3000/user", {
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        "username": input.username,
                        "email": input.email,
                        "password": input.password,
                        "creationDate": GetDate()
                    }
                )

            })
            navigate("/")
            return true
        }
        else {
            alert("passwords do not match")
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    return (
        <div className="form-container">
            <div className="form-body">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username</p>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleInput}
                        />
                    </label>
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
                    <label>
                        <p>Password again</p>
                        <input
                            type="password"
                            id="passwordR"
                            name="passwordR"
                            onChange={handleInput}
                        />
                    </label>
                    <div className="buttons">
                        <button type="submit">
                            Register
                        </button>
                        <Link to={"/"}>
                            <button>
                                Back
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
