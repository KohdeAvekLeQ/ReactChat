// Style
import './chat.scss';

// React
import {useState} from 'react';
import useKeypress from 'react-use-keypress';

// Comps
import ChatMessage from './chatMessage.js';


// Chat component
export default function Chat(data) {
    // ---- STATES ----
    const [folded, setFolded] = useState(true);     // Phone folded
    const [inputFocus, setFocus] = useState(false); // Input selected
    const [msg, setMsg] = useState("");             // Message input


    // ---- FUNCTIONS ----
    function sendMessage() {
        if(msg.length > 1) {
            data.socket.emit('sendMessage', data.pseudo, msg);
        }
    }
    function unfoldPhone() {
        setFolded(false);
        setTimeout(() => {
            document.getElementById('inputMsgElem').focus();
            let elem = document.getElementById('messages');
            elem.scrollTop = elem.scrollHeight;
        }, 0);
    }


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
    if(data.messages !== null) {
        for (let i in data.messages) {
            let msg = data.messages[i];

            // Add message
            messagesDiv.push(
                <ChatMessage key={i} type={data.type} sender={msg.sender} send={msg.sender === data.pseudo} content={msg.content}/>
            );
        }
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
                    <div id="messages">
                        {messagesDiv}
                    </div>

                    <div id="messageInput">
                        <div id="msgInputDiv">
                            <input 
                                id='inputMsgElem'
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