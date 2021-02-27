import React from 'react'
import styled from "styled-components"

export default function Message({message, timestamp, user, userImage}) {
    return (
        <MessageContainer>
            <img src={userImage} />
            <MessageInfo>
                <h4>
                    {user}
                    <span> { new Date(timestamp?.toDate()).toUTCString() } </span>
                </h4>
                <p> {message} </p>
            </MessageInfo>
        </MessageContainer>
    )
}


const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    >img {
        height: 40px;
        border-radius: 50%;       
    }
`;
const MessageInfo = styled.div`
    padding-Left: 10px;

    >h4 >span{
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 10px;
    }
`;