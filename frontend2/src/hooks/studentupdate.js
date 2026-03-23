import { editStudent } from "../api/studentAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApp } from "../ThemeApp";
import { userProfile } from "../api/userAPI";

export const useEditStudent = (id) => {

     const {setGlobalMsg} = useApp();
     const {isLoading,isError,error,data} = useQuery({
          queryKey : [`${id}`],
          queryFn : () => userProfile(id),
     });

     const update = useMutation({
          mutationFn : ({data,id}) => editStudent(data,id),

          onSuccess :  () => {
               setGlobalMsg("User Updated Successfully");
               
          },

          onError : () => {
               setGlobalMsg("User Updated Failed");
          }
     });

     const handleUpdate = (updateData,updateId) => {

          if(!updateData) {
               setGlobalMsg("Cannot Update Data");
               return false;
          }

          update.mutate({data : updateData, id :updateId});
     }

     return({
          handleUpdate,
          isLoading,
          isError,
          error,
          data
     });
}