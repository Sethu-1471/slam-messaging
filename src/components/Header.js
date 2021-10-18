import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTime from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Logout from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "../action";

function Header() {
  const socket = window.socket;
  let dispatch = useDispatch();

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png"
          // src={user?.photoURL}
          // alt={"Sethpahti"}
        />
        {/* <AccessTime /> */}
      </HeaderLeft>
      <HeaderSearch>
        <SearchIcon />
        <input
          placeholder="Search"
          onChange={(e) => {
          }}
        />
      </HeaderSearch>
      <HeaderRight>
        <Logout
          onClick={() => {
            localStorage.clear();
            dispatch(logout());
          }}
        />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  color: white;
  background-color: var(--slack-color);
  box-shadow: 0 4px 2px -2px gray;
  z-index: 99
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    cursor: pointer;
    .hover {
    }
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  border-radius: 7px;
  display: flex;
  padding: 0 30px;
  text-align: center;
  background-color: white;
  opacity: 1;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 90%;
    outline: 0;
    color: black;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
    border-radius: 50%;
    padding: 6px;
  }
  > .MuiSvgIcon-root:hover {
    cursor: pointer;
    color: var(--slack-color);
    background: white;
  }
`;
