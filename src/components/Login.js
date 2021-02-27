import { Button } from '@material-ui/core'
import React from 'react'
import styled from "styled-components"
import {auth, provider} from "../firebase"

export default function Login() {
    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(err => {
            alert(err.message);
        })
    }
    return (
        <LoginContainer>
            <LoginInnerContainer>
                <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" />
                <h2>Sign in to the slam messaging</h2>
                <p>slam-messaging.firebaseapp.com</p>
                <Button type="submit" onClick={signIn}>
                    Sign in with google
                </Button>
            </LoginInnerContainer>
        </LoginContainer>
    )
}


const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`;

const LoginInnerContainer = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0, 0.12), 0 1px 2px rgba(0,0,0,0.24);
    >img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }
    >button {
        background-color: #0a8d48 !important;
        text-transform: inherit !important;
        color: white;
        margin-top: 50px;
    }
`;