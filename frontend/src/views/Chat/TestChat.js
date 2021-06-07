
import Message from '../../components/Chat/Message';

const nachrichten = [
    {
        count: "1",
        align: "right",
        nachricht: "Hallo, wie findest du React?",
        zeit: "09:30",
    },
        {
        count:"2",
        align:"left",
        nachricht:"React ist eine Bitch!",
        zeit:"09:32",
    },
        {
        count:"3",
        align:"right",
        nachricht:"Absolt deiner Meinung!",
        zeit:"10:00",
    }
]

const Chat = () => {
    return (
        <>
            {nachrichten.map((nachrichten) =>(<Message key={nachrichten.count}
                                                            align={nachrichten.align}
                                                            nachricht={nachrichten.nachricht}
                                                            zeit={nachrichten.zeit}/>))}
        </>
    )
}

export default Chat

