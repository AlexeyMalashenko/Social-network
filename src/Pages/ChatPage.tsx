import React, {useEffect, useState} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC<any> = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const [WSSChannel, setWSSChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            setTimeout(createChannel, 3000);
        }

        function createChannel() {
            ws?.removeEventListener("close", closeHandler);
            ws?.close();
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            ws?.addEventListener("close", closeHandler)
            setWSSChannel(ws);
        };
        createChannel();

        return () => {
            ws.removeEventListener("close", closeHandler);
            ws.close();
        }
    }, []);

    useEffect(() => {

    }, [WSSChannel])

    return <div>
        <Messages WSSChannel={WSSChannel}/>
        <MessageForm WSSChannel={WSSChannel}/>
    </div>
}

const Messages: React.FC<{ WSSChannel: WebSocket | null }> = ({WSSChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            const newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        };
        WSSChannel?.addEventListener("message", messageHandler)
        return () => {
            WSSChannel?.removeEventListener("message", messageHandler)
        }
    }, [WSSChannel])

    return <div style={{height: "500px", overflowY: "auto"}}>
        {messages.map((m, index) => <Message key={index} message={m}/>)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return <div>
        <img src={message.photo} style={{width: "50px"}}/>
        <b> Имя: {message.userName}</b>
        <b> Идентификатор: {message.userId}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const MessageForm: React.FC<{ WSSChannel: WebSocket | null }> = ({WSSChannel}) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready")
        };
        WSSChannel?.addEventListener("open", openHandler)
        return () => {
            WSSChannel?.removeEventListener("open", openHandler)
        }
    }, [WSSChannel])


    const sendMessage = () => {
        if (!message) {
            return
        }
        WSSChannel?.send(message)
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={WSSChannel === null || readyStatus !== "ready"} onClick={sendMessage}>Отправить</button>
        </div>
    </div>
}

export default ChatPage