import apiClient from "./apiClient";

export const getCurrentYear = async () => {

     const response = await apiClient.get("/years/active");

     if(!response.data.success){
          return false;
     }
     const res = response.data.data;

     return res;
}