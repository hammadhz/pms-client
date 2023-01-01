import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
export const User = createContext({});

const intialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  media: [],
  profile: [],
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_CURRENT_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_MEDIA":
      return {
        ...state,
        media: [...state.media, action.payload],
      };
    case "GET_MEDIA":
      return {
        ...state,
        media: action.payload,
      };
    case "ADD_PROFILE":
      return {
        ...state,
        profile: [...state.profile, action.payload],
      };
    case "GET_PROFILE":
      return {
        ...state,
        profile: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  return <User.Provider value={{ state, dispatch }}>{children}</User.Provider>;
};
