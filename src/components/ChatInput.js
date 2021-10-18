import { Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function ChatInput({ channelId, channelName, chatRef, number }) {
  const [input, setInput] = React.useState("");
  const inputRef = React.useRef(null);
  const socket = window.socket;
  const user = useSelector((state) => state.getUser);
  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Sending...");
    if (!channelId) {
      return false;
    }
    socket.emit("messageSend", {
      message: input,
      senderName: user.name,
      senderNum: user.contact,
      roomId: channelId,
      recieverNumber: number,
    });
    // chatRef?.current?.scrollIntoView({
    //   behavior: "smooth",
    // });
    setInput("");
  };

  React.useEffect(() => {
    setInput("");
  }, [channelId]);

  return (
    <ChatInputContainer>
      <form>
        <div>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <Button hidden type="submit" onClick={sendMessage}>
            SEND
          </Button>
        </div>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  > form {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
  }
  > form > div {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0px;
    background-color: #f1f1f0;
    height: 67px;
    width: 85%;
  }
  > form > div > input {
    border: none;
    border-radius: 50px;
    padding: 15px;
    outline: none;
    width: 60%;
  }

  > form > div > button {
  }
`;
