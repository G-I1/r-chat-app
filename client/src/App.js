import io from 'socket.io-client';
import {useState} from 'react';
import Chat from "./Chat"

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showMsg,setShowMsg] = useState(false)

  const handleJoin = (event) =>{
    if(userName !=='' && roomId !== ''){
      socket.emit("join_room",roomId)
      setShowMsg(true);
    }
  } 

  return (
    <div className="App">
      {!showMsg && <div className="joinRoom">
        <input type="text" 
        className="userName"
         placeholder="User"
         value={userName}
         onChange={(event)=>setUserName(event.target.value)}
         />
        <input type="text"
         className="roomId" 
         placeholder="room id"
         onChange={(event)=>setRoomId(event.target.value)}
         />
        <button className='joinBtn' onClick={handleJoin}>Join</button>
      </div>}
      {showMsg &&<Chat userName={userName} roomId={roomId} socket={socket} showMsg={showMsg}></Chat> }
    </div>
  );
}

export default App;
