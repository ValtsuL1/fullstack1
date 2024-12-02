import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { getId } from "../decoder/decoder"
import useUser from "../swr/useUser"
import Header from "./Header"

function Chat() {
    const userId = getId()

    const {user} = useUser(Number(userId))

    interface Message {
        username: string
        content: string
    }

    const [messageHistory, setMessageHistory] = useState<Message[]>([])
    const [currentMessage, setCurrentMessage] = useState('')
    const [socket, setSocket] = useState(io(""))

    useEffect(() => {
        const newSocket = io("http://localhost:3000", {
            withCredentials: true,
            extraHeaders: {
                'authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
        setSocket(newSocket)

        return () => {
            socket.disconnect()
        }
    }, [])

    const handleClickSendMessage = useCallback(() => {
        socket.emit("message", user.username, currentMessage)
        setCurrentMessage(() => '')
    }, [currentMessage])
    

    socket.off("response").on("response", (data) => {
        let message = {
            username: data[0],
            content: data[1]
        }
        console.log(data)
        setMessageHistory((prev) => prev?.concat(message))
        console.log(messageHistory)
    })

    return (
        <div>
            <Header></Header>
            <h1>Chat</h1>
            <table>
                <tbody>
                    {
                        messageHistory?.map((message) => (
                            <p>{message.username}: {message.content}</p>
                        ))
                    }
                </tbody>
            </table>

            <textarea 
                value={currentMessage} 
                onChange={(e)=> setCurrentMessage(e.target.value)} 
                rows={3} 
                cols={50}>
            </textarea>
            <div>
                <button onClick={handleClickSendMessage}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat