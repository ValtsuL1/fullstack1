import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"


function UpdatePost() {
    let { id } = useParams()

    const navigate = useNavigate()

    const { userpost } = useUserpost(Number(id))

    interface FormElements extends HTMLFormControlsCollection {
        title: HTMLInputElement
        content: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        title: userpost.title,
        content: userpost.content,
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.title !== "" && input.content !== "") {
            await fetch(`http://localhost:3000/user-post/${userpost.id}`, {
                method: 'PATCH',
                headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        "title": input.title,
                        "content": input.content
                    }
                )
            })
            navigate(-1)
            return true
        }
        alert("input not valid")
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
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
                        defaultValue={userpost.title}
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
                        defaultValue={userpost.content}
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdatePost