import React from 'react'
import styled from "styled-components"
import { Avatar } from "@material-ui/core"
import AccessTime from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search"
import HelpOutline from "@material-ui/icons/HelpOutline"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebase"

function Header() {
    const [user] = useAuthState(auth);
    return (
        <HeaderContainer>
            <HeaderLeft>
                <HeaderAvatar
                    onClick={() => auth.signOut()}
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                <AccessTime />
            </HeaderLeft>
            <HeaderSearch >
                <SearchIcon />
                <input placeholder="Search" />
            </HeaderSearch>
            <HeaderRight>
                <HelpOutline />
            </HeaderRight>
        </HeaderContainer>
    )
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
`;

const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
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
    background-color: #421f44;
    opacity: 1;
    border: 1px solid gray;

    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        min-width: 90%;
        outline: 0;
        color: white;
    }
`;


const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;

    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`;