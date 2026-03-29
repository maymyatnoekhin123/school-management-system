import { useMutation, useQuery } from "@tanstack/react-query";
import { createClassroom, deleteClassroom, getAllClassrooms } from "../api/classroomAPI";
import { queryClient, useApp } from "../ThemeApp";


export const useClassrooms = () => {

     const {setGlobalMsg} = useApp();
     const {isLoading : isCLoading,isError : isCError , error : cError,
          data : classrooms
     } = useQuery({
          queryKey : ["classrooms"],
          queryFn : getAllClassrooms
     });

     const useCreateClassroom = useMutation({
          mutationFn : createClassroom,
          onSuccess : () => {
               queryClient.invalidateQueries({queryKey : ["classrooms"]});
               setGlobalMsg("Classroom added successfully");
          },



          onError : (error) => {
               setGlobalMsg(error.message);
          }
     });

     const useDeleteClassroom = useMutation({
          mutationFn : id => deleteClassroom(id),

          onMutate : (id) =>  {

               queryClient.cancelQueries({queryKey : ["classrooms"]});
               queryClient.setQueryData(["classrooms"],old => {
                    return old ? old.filter(classroom => classroom.id !== id) : [];
                    
               });
               setGlobalMsg("Successfully deleted classrooms");
          },

          onError: () => {
               setGlobalMsg("Successfully delete classrooms");
          },
     });

     const handleCreateClassroom = (name) => {

          if(!name){
               setGlobalMsg("Required fields must be filled");
               return false;
          }

           useCreateClassroom.mutate({name});
     }


     return ({
          isCLoading,
          isCError,
          cError,
          classrooms,
          useDeleteClassroom,
          handleCreateClassroom,
     });
}