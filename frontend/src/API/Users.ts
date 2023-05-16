import axios, { AxiosError } from "axios";
import { User } from "../modals/User";

// import { successToast, errorToast } from "../components/HOC/Toast";

axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.headers.post["Content-Type"] = "application/json";
interface userInput {
  name: string;
  email: string;
  password: string;
}
interface signup {
  email: string;
  password: string;
}

export async function registerUser(user: userInput) {
 
    const response = await axios.post("api/user/register", user);
console.log(response.data);

    return response.data;
 
}
export async function loginUser(user: signup) {

    const response = await axios.post("api/user/login", user);
    
    return response.data;
  
}
