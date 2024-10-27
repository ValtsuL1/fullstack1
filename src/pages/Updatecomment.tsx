import { useNavigate, useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"
import useComment from "../swr/useComment"
import { useState } from "react"

function Updatecomment() {
    let { userpostid, commentid } = useParams()

    interface FormElements extends HTMLFormControlsCollection {
        title: HTMLInputElement
        content: HTMLInputElement
    }

    interface FormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const { userpost } = useUserpost(Number(userpostid))

    const { comment } = useComment(Number(commentid))

    const navigate = useNavigate()

    const [input, setInput] = useState({
        content: ""
    })

    const handleSubmit = async (e: React.FormEvent<FormElement>) => {
        e.preventDefault()
        if (input.content !== "") {
            await fetch(`http://localhost:3000/comment/${comment.id}`, {
                method: 'PATCH',
                headers: { 'content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
                credentials: 'include',
                body: JSON.stringify(
                    {
                        "content": input.content,
                    }
                )
            })
            navigate(-1)
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

    if (comment) {

        return (
            <div>
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
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Update comment</p>
                        <textarea
                            id="content"
                            name="content"
                            onChange={handleTextarea}
                            defaultValue={comment.content}
                            rows={8}
                            cols={100}
                        />
                    </label>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        )
    }
    else {
        return (
            <div>
                error
            </div>
        )
    }
}

export default Updatecomment