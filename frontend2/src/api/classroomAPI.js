import apiClient from "./apiClient";

export const getAllClassrooms = async () => {

     const response = await apiClient.get("/classrooms");

     if(!response.data.success){
          return false;
     }

     return response.data.data;
}