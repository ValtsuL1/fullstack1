import { useState } from "react"
import { Link } from "react-router-dom"

function Login() {

    interface FormElements extends HTMLFormControlsCollection {
        username: HTMLInputElement
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
    })

    const handleSubmit = (e: React.FormEvent<FormElement>) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "" && input.email !== "") {
            console.log(input.username)
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