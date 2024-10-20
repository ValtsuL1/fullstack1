import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GetDate from "../GetDate"


function CreatePost() {

    const navigate = useNavigate()
    console.log(GetDate())

    interface FormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement
        password: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        title: "",
        content: "",
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        await fetch("http://localhost:3000/auth/login", {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(
                {
                    "email": input.title,
                    "password": input.content,
                    "userId": localStorage.getItem("user_id"),
                    "creationDate": GetDate()
                }
            )
        })
        navigate("/")
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                    <p>Title</p>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        onChange={handleInput}
                    />
                </label>
                <label>
                    <p>Content</p>
                    <textarea
                        id="content"
                        name="content"
                        onChange={handleTextarea}
                        rows={20}
                        cols={100}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost