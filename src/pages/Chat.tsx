import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useWebSocket, { ReadyState } from "react-use-websocket"

function Chat() {
    let { id } = useParams()

    const WS_BASE_URL = "ws://localhost:8000/ws/"

    const[messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([])
    const { sendMessage, lastMessage, readyState } = useWebSocket(WS_BASE_URL + id)
    const [currentMessage, setCurrentMessage] = useState('')

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage))
        }
    }, [lastMessage])

    const handleClickSendMessage = useCallback(() => {
        sendMessage(currentMessage)
        setCurrentMessage(() => '')
    }, [currentMessage])

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

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
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN || currentMessage === ''}
            >
                Send
            </button>
            <span>Connection status: {connectionStatus}</span>

        </div>
    )
}

export default Chat