import { useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"

function Userpost() {

    let { id } = useParams()

    const { userpost, isLoading, isError } = useUserpost(Number(id))

    return (
        <div>
            <h1>
                {userpost?.title}
            </h1>
            <p>
                {userpost?.content}
            </p>
        </div>
    )
}

export default Userpost