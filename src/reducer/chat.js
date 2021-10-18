let initState = { listUser: [] };

const listUserReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_LIST":
      return {
        ...state,
        listUser: [...state.listUser, action.user],
      };
    case "INIT_LIST":
      return {
        ...state,
        listUser: [...action.users],
      };
    default:
      return state;
  }
};

let initRoom = {
  roomId: null,
  roomName: null,
  roomNumber: null,
  roomMessage: [],
};

const roomReducer = (state = initRoom, action) => {
  switch (action.type) {
    case "ENTER_ROOM":
      return { ...state, roomId: action.id, roomName: action.title, roomNumber: action.number };
    case "ROOM_MESSAGE":
      console.log(action.messages)
      return { ...state, roomMessage: action.messages ? action.messages : [] };
    default:
      return state;
  }
};

const getList = () => listUserReducer;

module.exports = { listUserReducer, getList, roomReducer };
