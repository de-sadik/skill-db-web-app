import ActionTypes  from "../Actions/Action";


const addskillReducer = (skill=[] ,action) => {
  switch (action.type) {
    case ActionTypes.GET_ALL_SKILLS:
      {
        return action.payload;
      }
      break;
    case ActionTypes.CREATE_SKILLS:
      {
        return  [...skill ,action.payload] ;
      }
      break;
    case ActionTypes.UPDATE_SKILLS:
      {
        return skill.map((sk) =>
        sk.id === action.payload.id ? action.payload : sk
      );
      }
      break;
    case ActionTypes.DELETE_SKILLS: {
      return skill.filter((sk) =>sk.id !== action.payload);
      }
      break;

    default:
      return skill;
      break;
  }
};
export default addskillReducer;
