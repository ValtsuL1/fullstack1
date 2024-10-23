import GetTime from "../functions/date/GetTime"
import useComment from "../swr/useComments.tsx"

function Comments(props: { userPostId: number }) {
    interface User {
        username: string
    }

    const { comments,  isLoading, isError } = useComment(props.userPostId)

    if (comments) {
    return (
        <div>
            <table>
                    <tbody>
                        {
                            comments?.map((item: { id: number, content: string, creationDate: string, user: User }) => {
                                if (isLoading) return <p>Loading</p>
                                if (isError) return <p>Error</p>
                                return (
                                    <tr key={item.id}>
                                        <td width={"80%"}>
                                            {item.content}
                                        </td>
                                        <td>
                                            {item.user.username}
                                        </td>
                                        <td>
                                            {GetTime(item.creationDate)}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
            </table>
        </div>
    )
    }
    else {
        return (
            <div>
                No comments
            </div>
        )
    }
}

export default Comments