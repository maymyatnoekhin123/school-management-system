import { useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "../ThemeApp";
import { showClassroom,updateClassroom } from "../api/classroomAPI";


export default function useEditClassroom(id){

     const {setGlobalMsg} = useApp();
     const {isLoading,isError,error,data } = useQuery({
          queryKey : [`${id}`],
          queryFn : () => showClassroom(id)
     });
     
     const useUpdateClassroom = useMutation({

          mutationFn : ({data,id}) => updateClassroom(data,id),

          onSuccess: () => {
               setGlobalMsg("Classroom Updated Successfully");
          },

          onError: () => {
               setGlobalMsg("Error update classrooms");
          },
     });

     const handleUpdate = (updateData, updateId) => {

          if (!updateData) {
               setGlobalMsg("Cannot Update Data");
               return false;
          }

          useUpdateClassroom.mutate({ data: updateData, id: updateId });
     }

     return({
          handleUpdate,
          isLoading,
          isError,
          error,
          data
     });
}