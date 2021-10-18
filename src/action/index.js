export const login = (user) => {
  return {
    type: "SIGN_IN",
    user,
  };
};

export const signUp = (body) => {
  return {
    type: "SIGN_UP",
    body,
  };
};

export const logout = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const addList = (user) => {
  return {
    type: "ADD_LIST",
    user,
  };
};

export const initList = (users) => {
  return {
    type: "INIT_LIST",
    users,
  };
};

export const enterRoom = ({id, title, number}) => {
  return {
    type: "ENTER_ROOM",
    id,
    title,
    number
  };
};

export const roomMessages = ({data, roomId}) => {
  return {
    type: "ROOM_MESSAGE",
    messages: data,
    roomId: roomId
  };
};
