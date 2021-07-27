

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null;

//вынос обработчика отдельно от ивенлисенера, т.к. нужна ссылка на одну и туже функцию, чтобы её ремувнуть
const closeHandler = () => {
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages))
};

function createChannel() {
    ws?.removeEventListener("close", closeHandler);
    ws?.close();
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws?.addEventListener("close", closeHandler)
    ws?.addEventListener("message", messageHandler)

};



export const chatApi = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages: ChatMessageType[]) => void;


