import apiClient from "./apiClient";

export const getAllUsers = async () => {

     const response = await apiClient.get("/users");

     if(response.data.success){
         const res = response.data.data
          return res;
     }
     return false;
}

export const userProfile = async (id) => {

     const response = await apiClient.get(`/users/${id}`);

     if(!response.data.success){
          return false;
     }

     const res = response.data.data;

     return res;
}

export const deleteUser = async (id) => {

     const response = await apiClient.delete(`/users/${id}`);

     const res = response.data;

     return res;
}

