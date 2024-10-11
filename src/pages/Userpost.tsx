import { useParams } from "react-router-dom"
import useUserpost from "../swr/usePost"

function Userpost() {

    let {id} = useParams()

    console.log(id)

    const {userpost, isLoading, isError} = useUserpost(id)

    return(
        <div>
            <h1>POST</h1>
        </div>
)
}

export default Userpost