import ActionTypes from "../Actions/Action";

const addsExpertiesReducer = (expertise = [], action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_SKILL_Experties:
      {
        return action.payload;
      }
      break;
    case ActionTypes.UPDATE_SKILL_Experties: {
      return expertise.map((sk) =>
        sk.id === action.payload.id ? action.payload : sk
      );
    }

    default:
      return expertise;
      break;
  }
};
export default addsExpertiesReducer;
