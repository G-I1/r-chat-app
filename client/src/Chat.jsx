import React, { useEffect, useState } from "react";

function Chat({ socket, roomId, userName, showMsg }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [msgList, setMsgList] = useState([]);

  const handleSendMsg = async () => {
    if (currentMessage !== "") {
      const msgData = {
        message: currentMessage,
        user: userName,
        room: roomId,
        date:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", msgData);
      setMsgList((list) => [...list, msgData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chatContainer">
      <div className="chatDisplay">
        {msgList.length !== 0 && (
          <>
            {msgList.map((msg) => {
              return (<div className={(msg.user === userName )?"message you":"message other"}>
              <div className="message_content">{msg.message}</div>
              <div className="message_meta">{msg.user} - {msg.date}</div>
              </div>)
            })}
          </>
        )}
      </div>
      <div className="sendContainer">
        <input
          type="text"
          value={currentMessage}
          className="chatMessage"
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="sendMessageBtn" onClick={handleSendMsg}>
        &#8618;
        </button>
      </div>
    </div>
  );
}

export default Chat;
