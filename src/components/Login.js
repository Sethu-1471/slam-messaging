import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { login, signUp } from "../action";
const { toast } = require("react-toastify");
const { httpRequest } = require("../Api/httpRequest");
 
export default function Login() {
  const [status, setStatus] = useState(true);
  const [body, setBody] = useState({});
  const dispatch = useDispatch();

  const signIn = async () => {
    if (body.phone && body.password) {
      let apiReq = {
        endpoint: "/auth/login",
        method: "POST",
        body: body,
      };
      await httpRequest(apiReq)
        .then((res) => {
          localStorage.setItem("auth-token", res.data.token);
          localStorage.setItem("logged", true);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast(res.data.message, "success");
          dispatch(login(res.data.user));
        })
        .catch((err) => {
          console.log("ERROR", err.message);
          toast(err.message, "success");
        });
    } else {
      toast("Some fields are unfilled", "error");
    }
  };

  const signUp = async () => {
    if (body.phone && body.password && body.username) {
      let apiReq = {
        endpoint: "/auth/register",
        method: "POST",
        body: body,
      };
      await httpRequest(apiReq)
        .then((res) => {
          console.log({ res });
          toast(res.data.message, "success");
          return true;
        })
        .catch((err) => {
          console.log("ERROR", err.message);
          toast(err.message, "success");
        });
    } else {
      toast("Some fields are unfilled", "error");
    }
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" />
        <h2>
          {" "}
          {status ? "Sign in " : "Sign Up "}
          to the Chat App
        </h2>
        <input
          placeholder="Phone Number"
          value={body?.phone ? body?.phone : ""}
          onChange={(e) => {
            setBody({
              ...body,
              phone: e.target.value,
            });
          }}
        />
        {!status && (
          <input
            placeholder="User Name"
            value={body?.username ? body?.username : ""}
            onChange={(e) => {
              setBody({
                ...body,
                username: e.target.value,
              });
            }}
          />
        )}
        <input
          placeholder="Password"
          value={body.password ? body.password : ""}
          onChange={(e) => {
            setBody({
              ...body,
              password: e.target.value,
            });
          }}
        />
        <Button type="submit" onClick={() => (status ? signIn() : signUp())}>
          {status ? "Sign in" : "Sign Up"}
        </Button>
        <p
          onClick={() => {
            setBody({});
            setStatus(!status);
          }}
        >
          {status ? "To Register" : "To Login"} Click Here
        </p>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  background-color: #ececed;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  width: 40%;
  height: 80%;

  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > p {
    cursor: pointer;
    margin-top: 30px;
  }
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 30px;
  }
  > input {
    border: none;
    border-radius: 50px;
    padding: 10px;
    outline: none;
    width: 60%;
    background-color: #ececed;
    margin-top: 30px;
    text-align: center;
  }
  > button {
    background-color: #009789 !important;
    text-transform: inherit !important;
    margin-top: 30px;
    color: white;
    width: 60%;
  }
`;
