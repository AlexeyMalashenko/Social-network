import React, {useEffect, useState} from "react";
import {ChatMessageType} from "../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../redux/chat-reducer";
import {AppStateType} from "../redux/redux-store";


const ChatPage: React.FC<any> = () => {
    return <div>
        <Chat/>
    </div>
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages/>
        <MessageForm/>
    </div>
}

const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)


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

const MessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}/>
        </div>
        <div>
            <button disabled={status !== "ready"} onClick={sendMessageHandler}>Отправить</button>
        </div>
    </div>
}

export default ChatPage