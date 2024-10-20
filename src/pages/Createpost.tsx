import { useState } from "react"
import { useNavigate } from "react-router-dom"
import GetDate from "../functions/GetDate"


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
        if (input.title !== "" && input.content !== "") {
            await fetch("http://localhost:3000/user-post", {
                method: 'POST',
                headers: {'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
                credentials: 'include',
                body: JSON.stringify(
                    {
                        "title": input.title,
                        "content": input.content,
                        "userId": localStorage.getItem("user_id"),
                        "creationDate": GetDate()
                    }
                )
            })
            navigate("/")
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