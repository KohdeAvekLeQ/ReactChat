// Style
import './App.scss';

// React
import {useState, useEffect} from 'react';

// Socket
import {socket, socketReconnect} from './socket/handler.js';

// Components
import Chat from './chat/chat.js';


// APP COMPONENT
export default function App() {
  // ---- EFFECTS ----
  useEffect(() => {
    // Socket functions
    
    
    // Socket events
    
  

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
      // Socket off
      
      

      // Keys / Unload
      document.removeEventListener("keydown", keyPressHandler);
      window.removeEventListener("beforeunload", unloadWarning);
    };
  });
  let messages = [{sender: 'Tarace', content: 'Wow incroyable'}, {sender: 'Kohdé', content: "C'est vraiment fou"}];

  // ---- RENDER ----
  return (
    <div id="App">
      <Chat messages={messages} position={25} type={'floating'} pseudo='Kohdé'/>

      <Chat messages={messages} position={50} type={'sticked'} pseudo='Tarace'/>

      <Chat messages={messages} position={75} type={'floating'} pseudo='Kohdé'/>
    </div>
  );
}
