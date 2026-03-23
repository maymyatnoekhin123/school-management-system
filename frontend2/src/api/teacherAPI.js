import apiClient from "./apiClient";


export const getAllTeacherCounts = async () => {

     const response = await apiClient.get("/teachers/total");

     if(response.data.success){
          return response.data.data;
     }

     return 0
}

export const createTeacher = async (data) => {

     const response = await apiClient.post("/teachers/register",data,{
          headers : {
               "Content-Type" : "multipart/form-data"
          }
     });

     if(response.data.success){
          return response.data.data;
     }

     return 0 ;
}

export const editTeacher = async (data, id) => {
     const response = await apiClient.patch(`/teachers/${id}`,
          data
     );
     if (!response.data.success) {
          return false;
     }
     return response.data.data;
}