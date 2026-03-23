import { Navigate } from "react-router-dom";
import { useApp } from "../ThemeApp";
import apiClient from "./apiClient";
const getToken = () => {

     return localStorage.getItem("token");
}


export const registerUser = async ({name,email,password}) => {

     const {setGlobalMsg} = useApp();
     try {
          const response = await apiClient.post("/auth/register",{
               name,
               email,
               password
          });

          if(response.data.success){
               // <Navigate to="/login" replace="/>" />
               return response.data;
          }

     }catch (error){
          return setGlobalMsg("Register failed");
     }
}


export const loginUser = async ({ email, password }) => {
     try {
          const response = await apiClient.post("/auth/login", {
               email,
               password
          });

          const res = response.data.data;

          if (res.token) {
               localStorage.setItem("token", res.token);
          }

          return res;

     } catch (error) {
          throw error.response?.data || error.message;
     }
};

export const fetchVerify = async () => {
     try {

          const token = getToken();

          if (token) {
               const response = await apiClient.get("/auth/verify");

               return response.data.data;
          }

          return false;

     } catch (error) {
          return false;
     }
}

export const logout = async () => {
     // const { setAuth, setGlobalMsg } = useApp();

     const res = await apiClient.get("/auth/logout");
     // setGlobalMsg(res.data.message);
     // setAuth(null);
     localStorage.removeItem("token");
};
