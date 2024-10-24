import { Link, useNavigate, useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"
import "./css/Userpost.css"
import { useState } from "react"
import GetDate from "../functions/date/GetDate"
import Comments from "./Comments"
import Header from "./Header"

function Userpost() {
    const navigate = useNavigate()

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

    const [show, setShow] = useState(false)

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.content !== "") {
            await fetch("http://localhost:3000/comment", {
                method: 'POST',
                headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
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
            window.location.reload()
            return true
        }
        alert("Comment is empty")
    }

    const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function DeletePost() {
        await fetch(`http://localhost:3000/user-post/${userpost.id}`, {
            method: 'DELETE',
            headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
            credentials: 'include',
        })
        navigate("/")
        return true
    }

    if (userpost) {
        return (
            <div>
                <Header></Header>
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
                    {localStorage.getItem('user_id') == userpost.user.id &&
                        <div style={{
                            textAlign: "left"
                        }}>
                            <button onClick={DeletePost}>
                                Delete
                            </button>
                        </div>
                    }
                    <div>
                        <p>
                            Created by:
                            <Link to={`/profile/${userpost.user.id}`}>
                                {userpost.user.username}
                            </Link>
                        </p>
                        {sessionStorage.getItem('token') &&
                            <button onClick={() => setShow(!show)}>
                                Comment
                            </button>
                        }
                    </div>
                    {show && sessionStorage.getItem('token') &&
                        <div className="comment-create">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <p>Comment</p>
                                    <textarea
                                        id="content"
                                        name="content"
                                        onChange={handleTextarea}
                                        rows={8}
                                        cols={100}
                                    />
                                </label>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    }

                    <div className="comments-container">
                        <Comments userPostId={Number(id)}></Comments>
                    </div>
                </div>
            </div>
        )
    }
}

export default Userpost