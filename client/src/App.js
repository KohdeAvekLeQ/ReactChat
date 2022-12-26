// Style
import './App.scss';

// React
import {useState, useEffect} from 'react';

// Socket
import {socket, socketReconnect} from './socket/handler.js';

// Components
import Chat from './chat/chat.js';


// ---- INIT CHAT ----
let ids = ['209849', '2902880'];
for(let i = 0; i < ids.length; i++) {
  socket.emit('createChannel', ids[i]);
}


// APP COMPONENT
export default function App() {
  // ---- EFFECTS ----
  useEffect(() => {
    // Keys
    const keyPressHandler = (event) => {
      if (event.code === "F5" || event.code === "F11" || event.code === "F12") return;
      if(event.ctrlKey && event.shiftKey && (event.key === 'i' || event.key === 'I')) return;
    };
    document.addEventListener("keydown", keyPressHandler);


    // Before unload event
    const unloadWarning = (event) => {
      let message = "Êtes vous sûr de vouloir fermer la page ?"
      socketReconnect();
      event.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", unloadWarning);


    // Cleanup on end
    return function cleanup() {
      // Keys / Unload
      document.removeEventListener("keydown", keyPressHandler);
      window.removeEventListener("beforeunload", unloadWarning);
    };
  }, []);
  

  // ---- RENDER ----
  return (
    <div id="App">
      <Chat id={0} socket={socket} channel={ids[0]} position={12.5} type={'floating'} pseudo='Kohdé'/>
      <Chat id={1} socket={socket} channel={ids[0]}  position={37.5} type={'sticked'} pseudo='Tarace'/>

      <Chat id={2} socket={socket} channel={ids[1]}  position={62.5} type={'floating'} pseudo='Kohdé'/>
      <Chat id={3} socket={socket} channel={ids[1]}  position={87.5} type={'sticked'} pseudo='Tarace'/>
    </div>
  );
}
