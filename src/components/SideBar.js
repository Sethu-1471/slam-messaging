import {
  Create,
  Drafts,
  Inbox,
  Add,
  ExpandMore,
  BookmarkBorder,
  FiberManualRecord,
  InsertComment,
  PlusOne,
  PeopleAlt,
  FileCopy,
} from "@material-ui/icons";
import { Avatar } from "@material-ui/core";

import React from "react";
import styled from "styled-components";
import SideBarOptions from "./SideBarOptions";
import { useSelector } from "react-redux";

export default function SideBar() {
  const user = useSelector((state) => state.getUser);
  const list = useSelector((state) => state.listUserReducer);
  return (
    <SideBarContainer>
      <SideBarHeader>
        <SideBarInfo>
          <h2> {user?.name} </h2>
          <h4>
            <FiberManualRecord />
            {user?.contact}
          </h4>
        </SideBarInfo>
        {/* <Create /> */}
        <ImageAvatar style={{ margin: 0 }} />
      </SideBarHeader>

      {/* <SideBarOptions Icon={InsertComment} title="Tread" />
      <SideBarOptions Icon={Inbox} title="Mentions" />
      <SideBarOptions Icon={Drafts} title="Charts" />
      <SideBarOptions Icon={BookmarkBorder} title="Bookamrk" />
      <SideBarOptions Icon={PeopleAlt} title="People" />
      <SideBarOptions Icon={FileCopy} title="file" /> */}
      {/* <hr /> */}

      <SideBarOptions Icon={Add} title="New Chat" addChannelOption />
      {/* <SideBarOptions Image={PlusOne} title="Sethu" /> */}

      {list.listUser.length ? (
        list.listUser.map((doc) => (
          <SideBarOptions
            key={doc._id}
            id={doc._id}
            Image={PlusOne}
            title={
              +doc.phone === +user.contact ? doc.phoneTwoName : doc.phoneName
            }
            number={+doc.phone === +user.contact ? doc.phoneTwo : doc.phone}
          />
        ))
      ) : (
        <p>No Chat</p>
      )}
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  background-color: white;
  color: black;
  flex: 0.3;
  border-top: 1px solid white;
  max-width: 17%;
  margin-top: 60px;
  z-index: 4;

  > hr {
    margin: 10px 0;
    border: 1px solid white;
  }
`;

const ImageAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid lightgray;
  padding: 0px 10px;
  max-height: 65px;
  align-items: center;
  min-height: 65px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: black;
    font-size: 18px;
    background-color: black;
    border-radius: 50%;
  }
`;

const SideBarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 5px;
  }

  > h4 {
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 400;
  }

  > h4 > .MuiSvgIcon-root {
    font-size: 14px;
    color: green;
    margin-right: 2px;
    margin-top: 1px;
  }
`;
