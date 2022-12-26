// Style
import './App.css';

// React
import {useState, useEffect} from 'react';

// Socket
import {socket, socketReconnect} from './socket/handler.js';


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


  // ---- RENDER ----
  return (
    <div id="App">
      
    </div>
  );
}
