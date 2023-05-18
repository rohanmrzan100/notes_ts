import { createSlice } from "@reduxjs/toolkit";
import { BlockList } from "net";

interface State {
  token: string;
  isAuth: boolean;
  loading: boolean;
}

const initialState: State = {
  token: "",
  isAuth: false,
  loading: false,
};

export const authReducer = createSlice({
  name: "auth",

  initialState,
  reducers: {
    login: (state, action) => {
      switch (action.payload.type) {
        case "success":
          localStorage.setItem("token", action.payload.token);
          return {
            ...state,
            token: action.payload.token,
            isAuth: true,
          };

        case "error":
          localStorage.removeItem("token");
          return {
            ...state,
            token: "",
            isAuth: false,
          };

        default:
          return { ...state };
      }
      // localStorage.setItem("token",state.token)
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        isAuth: false,
      };
    },
    sendToken: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
      };
    },
    loading: (state, action) => {
      console.log(action);
      
      switch (action.payload.type) {
        case "true":
          return {
            ...state,
            loading: true,
          };
        case "false":
          return {
            ...state,
            loading: false,
          };

        default:
          return {
            ...state,
          };
      }
    },
  },
});

export const { login, logout, sendToken,loading } = authReducer.actions;

export default authReducer.reducer;
