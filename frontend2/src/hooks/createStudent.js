import { createStudent } from "../api/studentAPI";
import { useMutation } from "@tanstack/react-query";
import { useApp } from "../ThemeApp";
import { useState } from "react";

export const useCreateStudent = () => {

     const {setGlobalMsg} = useApp();
     const [error,setError] = useState(null);

     const create = useMutation({
          mutationFn : createStudent,

          onSuccess :  () => {

               // const msg = res.message;
               // const name = res.name;

               setGlobalMsg(`successfully add students`);
          },

          onError : (err) => {

               const errorMsg = err.response?.data?.message || "Something went wrong";
               setError(errorMsg);
               setGlobalMsg("Error", errorMsg);

               setGlobalMsg("Failed to add user");
          },
     });

     const handleCreate = (data) => {

          setError(null);
          if(!data){
               setError("Required fields must be filled");
               return false
          }

          create.mutate(data);
     }

     return ({
          error,
          handleCreate,
          isLoading : create.isPending
     });
}