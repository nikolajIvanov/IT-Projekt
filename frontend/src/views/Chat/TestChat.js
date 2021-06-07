import theme from "../../theme";
import EigeneMessage from '../../components/Chat/EigeneMessage';
import FremdeMessage from '../../components/Chat/FremdeMessage';

const EigeneNachrichten = [
    {
        count: "1",
        nachricht: "Hallo, wie findest du React?",
        zeit: "09:30",
    },

        {
        count:"3",
        nachricht:"Absolt deiner Meinung!",
        zeit:"10:00",
    }
]

const FremdeNachrichten = [
    {
        count:"2",
        nachricht:"React ist eine Bitch!",
        zeit:"09:32",
    },
]

const Chat = () => {
    return (
        <div style={theme.card}>
            {EigeneNachrichten.map((EigeneNachrichten) =>(<EigeneMessage key={EigeneNachrichten.count}
                                                            nachricht={EigeneNachrichten.nachricht}
                                                            zeit={EigeneNachrichten.zeit}/>))}
            {FremdeNachrichten.map((FremdeNachrichten)=>(<FremdeMessage key={FremdeNachrichten.count}
                                                            nachricht={FremdeNachrichten.nachricht}
                                                            zeit={FremdeNachrichten.zeit}/>))}
        </div>
    )
}

export default Chat

