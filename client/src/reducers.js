import {
  GET_ALL_OPINION_SUCCESS,
  ADD_OPINIONS_SUCCESS,
  DELETE_OPINION_SUCCESS,
  UPDATE_OPINION_SUCCESS,
} from './constants.js';

const initialState = {
  opinions: []
}

const opinionReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ALL_OPINION_SUCCESS:
      return {
        ...state,
        opinions: action.payload
      }

    case ADD_OPINIONS_SUCCESS:
      return {
        ...state,
        opinions: [...state.opinion, action.payload]
      };

    case DELETE_OPINION_SUCCESS:
      return {
        ...state,
        opinions: state.opinion.filter(value => value.id !== action.payload)
      }

    case UPDATE_OPINION_SUCCESS : {
      const newOpinion = [...state.opinion]
      let opinion = newOpinion.find(opinion => opinion.id === action.payload.id);
      opinion = action.payload;

      return {
        ...state,
        opinions: newOpinion
      };
    }

    default:
      return state;
  }
}

export default opinionReducer;