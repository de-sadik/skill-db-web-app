import ActionTypes  from "../Actions/Action";


const authReducer = (user={} ,action) => {
  switch (action.type) {
    case ActionTypes.SIGNIN:
      {
        return action.payload;
      }
      break;
    case ActionTypes.SIGNUP:
      {
        return action.payload;
      }
      break;
    

    default:
      return user;
      break;
  }
};
export default authReducer;
