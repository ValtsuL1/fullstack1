import { useState } from "react"
import { useParams } from "react-router-dom"
import { io } from "socket.io-client"

function Chat() {
    let { id } = useParams()

    const socket = io("http://localhost:3000", {
        withCredentials: true,
        extraHeaders: {
            'authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    })

    const[messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([])
    //const { sendMessage, lastMessage, readyState } = useWebSocket(io)
    const [currentMessage, setCurrentMessage] = useState('')
    
    /*
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage))
        }
    }, [lastMessage])

    const handleClickSendMessage = useCallback(() => {
        sendMessage(currentMessage)
        setCurrentMessage(() => '')
    }, [currentMessage])
    */
    

    const test = () => {
        socket.emit("ping")
    }

    socket.on("pong", (...args) => {
        console.log("received")
    })

    return (
        <div>
            <h1>Chat</h1>
            <ul>
                {messageHistory.map((message, idx) => (
                    <li key={idx}>{message ? message.data: null}</li>
                ))}
            </ul>

            <textarea 
                value={currentMessage} 
                onChange={(e)=> setCurrentMessage(e.target.value)} 
                rows={3} 
                cols={50}>
            </textarea>
            
            <button 
                onClick={test}
                
            >
                Send
            </button>
            <span>Connection status: </span>

        </div>
    )
}

export default Chat