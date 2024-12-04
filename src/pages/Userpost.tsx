import { Link, useNavigate, useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"
import "./css/Userpost.css"
import { useState } from "react"
import GetDate from "../functions/date/GetDate"
import Comments from "./Comments"
import Header from "./Header"
import FormatDate from "../functions/date/FormatDate"
import { getId, getRole, getState } from "../decoder/decoder"

function Userpost() {
    const navigate = useNavigate()

    let { id } = useParams()

    const { userpost } = useUserpost(Number(id))

    const userId = getId()
    const userRole = getRole()
    const userState = getState()

    function GetButtons() {
        if (userId == userpost.userId || userRole == 'admin') {
            return <div style={{
                textAlign: "left"
                }}>
                <button onClick={DeletePost}>
                    Delete
                </button>
                <Link to={`/userpost/update/${Number(id)}`}>
                    <button>
                        Update
                    </button>
                </Link>
            </div>
        }
        else return null
    }

    interface FormElements extends HTMLFormControlsCollection {
        content: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [input, setInput] = useState({
        content: ""
    })

    const [showCommentArea, setShowCommentArea] = useState(false)

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
                        "userId": userId,
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

    function showCommentButton() {
        if (sessionStorage.getItem('token') && userState == 'normal') {
            return  <div> 
                <button onClick={() => setShowCommentArea(!showCommentArea)}>
                    Comment
                </button>
            </div>
        }
        else if(userState == 'banned') {
            return <div style={{ color: "red" }}>
                Banned from commenting
            </div>
        }
    }


    if (userpost) {
        return (
            <div>
                <Header></Header>
                <div>
                    <div className="post-container">
                        <div className="post-header">
                            <div className="post-title">
                                <p>
                                    {userpost?.title}
                                </p>
                            </div>
                            <div className="post-info">
                                <p>
                                    Created by:{' '}
                                    <Link to={`/profile/${userpost.user.id}`}>
                                        {userpost.user.username}
                                    </Link>
                                </p>
                                <p>
                                    Created on:{' '}
                                </p>
                                <p>
                                    {FormatDate(userpost.creationDate)}
                                </p>
                            </div>
                        </div>
                        <div className="post-body">
                            <p>
                                {userpost?.content}
                            </p>
                        </div>


                    </div>
                        {GetButtons()}
                    <div>
                        {showCommentButton()}
                    </div>
                    {showCommentArea &&
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