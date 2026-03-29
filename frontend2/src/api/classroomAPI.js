import apiClient from "./apiClient";

export const getAllClassrooms = async () => {

     const response = await apiClient.get("/classrooms");

     if(!response.data.success){
          return false;
     }

     return response.data.data;
}

export const createClassroom = async ({name}) => {

     const response = await apiClient.post("/classrooms",{name});

     if(!response.data.success){
          throw new Error(response.data.message || "Failed to create Classroom");
     }
     return response.data.data;
}

export const showClassroom = async (id) => {

     const response = await apiClient.get(`/classrooms/${id}`);

     if (!response.data.success) {
          throw new Error(response.data.message || "Failed to get Classroom");
     }

     return response.data.data;
}

export const updateClassroom = async (data,id) => {

     const response = await apiClient.patch(`/classrooms/${id}`,data);

     if(!response.data.success){
          throw new Error(response.data.message || "Failed to update");
     }
     return response.data.data;
}

export const deleteClassroom = async (id) => {

     const response = await apiClient.delete(`/classrooms/${id}`);

     if(!response.data.success){
          throw new Error(response.data.message || "Failed to delete Classroom");
     }

     return response.data.data;
}