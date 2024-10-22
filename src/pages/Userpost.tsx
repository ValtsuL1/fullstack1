import { Link, useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"
import "./css/Userpost.css"
import { useState } from "react"
import GetDate from "../functions/date/GetDate"
import useComments from "../swr/useComments"
import Comments from "./Comments"

function Userpost() {

    let { id } = useParams()

    const { userpost, isLoading, isError } = useUserpost(Number(id))

    interface FormElements extends HTMLFormControlsCollection {
        content: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        content: ""
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.content !== "") {
            await fetch("http://localhost:3000/comment", {
                method: 'POST',
                headers: {'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
                credentials: 'include',
                body: JSON.stringify(
                    {
                        "content": input.content,
                        "creationDate": GetDate(),
                        "userId": Number(localStorage.getItem("user_id")),
                        "userPostId": Number(id)
                    }
                )
            })
            return true
        }
        alert("input not valid")
    }

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            <div className="post-container">
                <div className="post-title">
                    <p>
                        {userpost?.title}
                    </p>
                </div>
                <div className="post-body">
                    <p>
                        {userpost?.content}
                    </p>
                </div>
            </div>
            <div className="comment-create">
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Comment</p>
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
            
            <div className="comments-container">
                <Comments userPostId={Number(id)}></Comments>
            </div>
        </div>
    )
}

export default Userpost