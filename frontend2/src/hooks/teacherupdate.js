import { editTeacher } from "../api/teacherAPI";
import { userProfile } from "../api/userAPI";
import { useApp } from "../ThemeApp";
import { useQuery,useMutation } from "@tanstack/react-query";

export const useUpdateTeacher = id => {
 
  const {setGlobalMsg} = useApp();
  const {isLoading,isError,error,data : teacher} = useQuery({
     queryKey : ["teacher"],
     queryFn : () => userProfile(id),
  });

  const update = useMutation({
     mutationFn : ({data,id}) => editTeacher(data,id),
     onSuccess : () => {

          setGlobalMsg("Teacher Update Successfully");
     },

     onError : () => {

          setGlobalMsg("Teacher Added Failed");
     }
  });

  const handleUpdate = (updateData,userId)  => {

     if(!updateData){
          setGlobalMsg("Cannot Update Data");
          return false;
     }

     update.mutate({data : updateData, id : userId});
  }

  return ( {
     isLoading,
     error,
     isError,
     teacher,
     handleUpdate
  });
}