// Style
import './chat.scss';

// React
import {useState, useEffect} from 'react';
import useKeypress from 'react-use-keypress';

// Comps
import ChatMessage from './chatMessage.js';


// Chat component
export default function Chat(data) {
    // ---- STATES ----
    const [folded, setFolded] = useState(true);     // Phone folded
    const [inputFocus, setFocus] = useState(false); // Input selected
    const [msg, setMsg] = useState("");             // Message input
    const [messages, setMessages] = useState([]);   // Messages list


    // ---- FUNCTIONS ----
    function sendMessage() {
        if(msg.length > 1) {
            data.socket.emit('newMessage', data.channel, data.pseudo, msg);
            setMsg("");
        }
    }
    function unfoldPhone() {
        setFolded(false);
        setTimeout(() => {
            document.getElementById(`inputMsg_${data.id}`).focus();

            let elem = document.getElementsByClassName(`messagesDiv_${data.id}`)[0];
            elem.scrollTop = elem.scrollHeight;
        }, 0);
    }


    // ---- Effects for socket functions ----
    useEffect(() => {
        // Function for global update
        function globalSetMessage(id, messages) {
            if(id === data.channel) {
                setMessages(messages);
            }
        }

        // Received functions 
        data.socket.on('setMessages', setMessages);
        data.socket.on('globalSetMessage', globalSetMessage);

        
        // Clean function
        return (() => {
            data.socket.off('setMessages', setMessages);
            data.socket.off('globalSetMessage', globalSetMessage);
        });
    }, []);


    // ---- KEYS ----
    useKeypress(['Enter', 'Escape'], (event) => {
        if(inputFocus) {
            if(event.key === 'Escape') { // Unfocus
                document.getElementById('inputMsgElem').blur();
            } else { // Send message
                sendMessage();
            }
        }
    });


    // ---- RENDER MESSAGES ----
    let messagesDiv = [];
    for (let i in messages) {
        let msg = messages[i];

        // Add message
        messagesDiv.push(
            <ChatMessage key={i} type={data.type} sender={msg.sender} send={msg.sender === data.pseudo} content={msg.content}/>
        );
    }


    // ---- RENDER ----
    if(folded) {
        return (
            <div id="FoldedChat" onClick={unfoldPhone} style={{left: `${data.position - 12}vw`}}>
                <span>▲ CHAT ▲</span>
            </div>
        );
    } else {
        return (
            <div id="Chat" style={{left: `${data.position - 12}vw`}}>
                <div id="topChat" onClick={() => {setFolded(true);}}><span>▼ CHAT ▼</span></div>

                <div id="chatContent">
                    <div id="messages" className={`messagesDiv_${data.id}`}>
                        {messagesDiv}
                    </div>

                    <div id="messageInput">
                        <div id="msgInputDiv">
                            <input 
                                id={`inputMsg_${data.id}`}
                                type='text' 
                                placeholder='Type your message'
                                value={msg}
                                onChange={(event) => {setMsg(event.target.value);}}
                                onFocus={() => {setFocus(true);}}
                                onBlur={() => {setFocus(false);}}
                            ></input>
                        </div>

                        <div id="sendMsgDiv" onClick={sendMessage}>
                            <span>➤</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}