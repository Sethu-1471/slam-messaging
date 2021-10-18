import React, { useEffect } from "react";
import styled from "styled-components";
import { StarBorderOutlined, InfoOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { addList } from "../action";
import { toast } from "react-toastify";
import ChatProfile from "./ChatProfile";
import { initList, roomMessages } from "../action";
import { Avatar } from "@material-ui/core";
import moment from "moment";

function Chat() {
  const user = useSelector((state) => state.getUser);
  const roomMessage = useSelector((state) => state.roomReducer.roomMessage);
  const dispatch = useDispatch();
  const socket = window.socket;
  const chatRef = React.useRef(null);
  const roomId = useSelector((state) => state.roomReducer.roomId);
  const roomName = useSelector((state) => state.roomReducer.roomName);

  const roomNumber = useSelector((state) => state.roomReducer.roomNumber);
  console.log({ user, roomName, roomId, roomNumber });

  useEffect(() => {
    socket.on("connect", () => {
      //get the id from socket
      console.log(socket.id);
      socket.emit("saveUserSocket", user);
    });

    socket.on("firstCall", (res) => {
      dispatch(initList(res.data));
    });

    socket.on("searchResult", (res) => {
      console.log({ res });
    });

    socket.on("error", (res) => {
      toast(res.message, "error");
    });

    socket.on("addNewChat", (res) => {
      console.log("i called add new chat");
      dispatch(addList(res.data));
    });

    socket.on("recieveMessage", (res) => {
          dispatch(roomMessages({data: res.data, roomId: res.roomId}));
    });

    return () => socket.disconnect();
  }, []);

  // const [roomDetails] = useCollection(
  //     roomId && db.collection('room').doc(roomId)
  // )
  // const [roomMessage, loading] = useCollection(
  //     roomId && db.collection('room').doc(roomId).collection('message').orderBy("timestamp", "asc")
  // )

  React.useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
    console.log({ chatRef });
  }, [roomId, roomMessage]);

  // loading, roomMessage
  return (
    <ChatContainer>
      {roomId && (
        <>
          <Header>
            <HeaderLeft>
              <ImageAvatar style={{ margin: 0 }} />
              <h4>
                <strong> {roomName} </strong>
              </h4>
              <small>{roomId}</small>
              {/* <StarBorderOutlined /> */}
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          {/* <ChatContainerTwo> */}
          <ChatMessages>
            {roomMessage.length
              ? roomMessage.map((doc) => {
                  const { _id, message, createdAt, senderName, senderNum } =
                    doc;
                  return (
                    <Message
                      key={_id}
                      message={message}
                      timestamp={moment(createdAt).format("llll")}
                      user={senderName}
                      sameUser={+senderNum === +user.contact}
                      // userImage={userImage}
                    />
                  );
                })
              : "No Chat Available"}

            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <Footer>
            <ChatInput
              chatRef={chatRef}
              channelName={roomName}
              channelId={roomId}
              number={roomNumber}
            />
          </Footer>
          {/* </ChatContainerTwo> */}
        </>
      )}
      {/* <ChatProfile /> */}
    </ChatContainer>
  );
}

export default Chat;

const ImageAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const ChatMessages = styled.div`
  background-color: #e5ddd5;
  overflow-y: scroll;
  max-height: 80%;
  padding: 5px 20px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #ddd;
  }
  &::-webkit-scrollbar-thumb {
    background: #bdbdbd;
  }
`;

const ChatBottom = styled.div`
  padding-bottom: 0px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  border-bottom: 1px solid lightgray;
  background-color: #ececed;
  box-shadow: 0 4px 2px -2px gray;
  max-height: 65px;
  min-height: 65px;
  /* position: fixed;
  width: 80%; */
`;

const Footer = styled.div`
  background: green;
  overflow: hidden;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin: 0px 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  margin-top: 60px !important;
  background-color: #e5ddd5;
`;

// const ChatContainerTwo = styled.div`
//   height: 100%;
// `;
