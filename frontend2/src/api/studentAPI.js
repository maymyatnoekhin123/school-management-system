import apiClient from "./apiClient";


export const getAllStudentCounts = async () => {

     const response = await apiClient.get("/students/total");

     if (response.data.success) {
          return response.data.data;
     }
     return 0;
}


export const createStudent = async data => {

     const response = await apiClient.post("/students/register", data,
     {
          headers : {
               "Content-Type" : "multipart/form-data"
          }
     });

     if (!response.data.success) {
          return false;
     }

     return response.data.data;
}

export const editStudent = async (data,id) => {
     const response = await apiClient.patch(`/students/${id}`,
          data
     );
     if (!response.data.success) {
          return false;
     }
     return response.data.data;
}