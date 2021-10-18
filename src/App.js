import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Spinner from "react-spinkit";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isLogged = useSelector((state) => state.loggedStateReducer);
  if (false) {
    return (
      <Apploading>
        <ApploadingContents>
          <img src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c53e.png" />
          <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
        </ApploadingContents>
      </Apploading>
    );
  }

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        {!isLogged ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <SideBar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                  {/* <SideBar /> */}
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const Apploading = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const ApploadingContents = styled.div`
  text-align: center;
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    height: 100px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
