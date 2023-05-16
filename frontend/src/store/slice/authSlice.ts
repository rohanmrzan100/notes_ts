import { createSlice } from "@reduxjs/toolkit";


interface State {
 token:string;
 isAuth:boolean
}


const initialState: State = {
  token:"",
  isAuth:false
};

export const authReducer = createSlice({
  name: "auth",

  initialState,
  reducers: {
    login:(state,action)=>{
        
        switch (action.payload.type) {
            case "success":
                localStorage.setItem("token",action.payload.token)
                  return {
                    ...state,
                    token: action.payload.token,
                    isAuth:true
                  };
            
            case "error":
                localStorage.removeItem("token")
                  return {
                    ...state,
                    token: "",
                    isAuth:false
                  };
            
        
            default:
                return {...state}
                
            
        }
        // localStorage.setItem("token",state.token)
      
    },
    logout:(state,action)=>{
      localStorage.removeItem("token")
      return {
        ...state,
        token:"",
        isAuth:false
      }
    },
    sendToken:(state,action)=>{
     localStorage.setItem("token", action.payload.token);
     return {
       ...state,
       token: action.payload.token,
       isAuth: true,
     };
    }
    
  },
});

export const { login, logout, sendToken } = authReducer.actions;

export default authReducer.reducer;
