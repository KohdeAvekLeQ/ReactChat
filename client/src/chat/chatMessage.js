// Style
import './chatMessage.scss';


// Chat Message component
export default function ChatMessage(data) {
    // MESSAGES TYPE
    let type = data.type===undefined ? 'floating' : data.type;

    // RENDER
    return (
        <div className={'chatMessage' + (data.send ? ' sender ' : ' receiver ') + type}>
            <span className="emitter">{data.sender} :</span>
            <span>{data.content}</span> 
        </div>
    );
}