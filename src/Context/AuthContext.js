import { createContext, useReducer } from "react";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
export const AuthContext = createContext({});

const intialState = {
  user: Cookies.get("accessToken")
    ? decodeToken(Cookies.get("accessToken"))
    : null,
  media: [],
  profile: [],
  specialUser: [],
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return {
        ...state,
        user: action.payload,
      };
    case "SIGN_IN":
      return {
        ...state,
        user: action.payload,
      };
    case "ADD_SPECIAL_USER":
      return {
        ...state,
        specialUser: [...state.specialUser, action.payload],
      };
    case "GET_SPECIAL_USER":
      return {
        ...state,
        specialUser: action.payload,
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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
