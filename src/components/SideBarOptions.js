import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {} from "../reducer/appSlice";
import { Avatar } from "@material-ui/core";
import { enterRoom } from "../action/index";

export default function SideBarOptions({
  Icon,
  Image,
  title,
  number,
  addChannelOption,
  id,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.getUser);
  const roomId = useSelector((state) => state.roomReducer.roomId);

  const socket = window.socket;
  const addChannel = () => {
    const channelName = prompt("Please enter mobile number");

    if (channelName) {
      socket.emit("search", {
        channelName,
        phone: user.contact,
        phoneName: user.name,
      });
    }
  };
  const selectChannel = () => {
    if (id && id != roomId) {
      socket.emit("getMessage", id);
      dispatch(enterRoom({ id, title, number }));
    }
  };

  return (
    <SideBarOptionsContainer
      active={id == roomId}
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Image && <ImageAvatar style={{ margin: 10 }} />}
      {Icon && <Icon style={{ margin: 10 }} />}
      <h3> {title} </h3>
      {/* {Icon ? (
        
      ) : (
        <SideBarOptionsChannel>
          {" "}
          <span>#</span> {title}{" "}
        </SideBarOptionsChannel>
      )} */}
    </SideBarOptionsContainer>
  );
}

const ImageAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SideBarOptionsContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  border-bottom: 0.1px solid #f1f1f0;
  ${({ active }) => active && `
    background-color: #ebebeb;
  `}
  :hover {
    opacity: 0.9;
    background-color: #ebebeb;
  }

  > h3 {
    font-weight: 500;
  }

  > h3 > span {
    padding: 15px;
  }
`;

const SideBarOptionsChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
