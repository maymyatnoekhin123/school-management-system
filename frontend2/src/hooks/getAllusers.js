import { deleteUser, getAllUsers, userProfile } from "../api/userAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemeApp";
// import { useParams } from "react-router-dom";

export const useGetUsers = () => {

     const {isLoading : userLoading,isError : isUserError,error : userError,data : users} = useQuery({
          queryKey : ["users"],
          queryFn : getAllUsers,
          enabled: !!localStorage.getItem("token")
     });

     const {setGlobalMsg} = useApp();

     const useDeleteUser = useMutation({

          mutationFn : id => deleteUser(id),

          onSuccess : id => {

               queryClient.cancelQueries({queryKey : ["users"]});
               queryClient.setQueryData(["users"],old => {
                   return old? old.filter(user => user.id !== id) : []
               });
               
               setGlobalMsg("A User Delete Successfully");
          },

          onError : () => {

               setGlobalMsg("A User Cannot Delete");
          },

          onSettled : () => {

               queryClient.invalidateQueries({queryKey : ["users"]});
          }
     });
     return ({
          userLoading,
          isUserError,
          userError,
          users,
          useDeleteUser
     });
}

export function useGetUserProfile(id){

     const {isLoading : isPLoading,isError :isPerror, error :pError,data : user} = useQuery({
          queryKey : [`/profile/${id}`],
          queryFn : async () => userProfile(id),
     });

     return ({
          isPLoading,
          isPerror,
          pError,
          user
     });
}