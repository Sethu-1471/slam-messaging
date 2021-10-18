import React from "react";
import styled from "styled-components";
import "./chat.css";

export default function Message({
  message,
  timestamp,
  user,
  userImage,
  sameUser = true,
  id,
}) {
  return (
    <div
      className={`msg ${sameUser ? "right-msg" : "left-msg"}`}
      key={id}
    >
      {/* <div
     className="msg-img"
     style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"
    ></div> */}

      <div className="msg-bubble">
       

              <div className="msg-text">{message}</div>
              <div className="msg-info">
          {/* <div className="msg-info-name">{user}</div> */}
          <div className="msg-info-time">{timestamp}</div>
        </div>
      </div>
    </div>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 7px 8px 9px;
  margin: 10px 40% 10px 10px;
  box-sizing: border-box;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
  font: inherit;
  font-size: 100%;
  vertical-align: initial;
  outline: none;
  border: 0;
  background-color: #009789;
  display: block;
  /* width: 100px; */
  width: fit-content;
  color: white;
  position: relative;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  /* >img {
        height: 40px;
        border-radius: 50%;       
    } */
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
