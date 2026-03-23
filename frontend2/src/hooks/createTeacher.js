import { useMutation } from "@tanstack/react-query";
import { useApp } from "../ThemeApp";
import { createTeacher } from "../api/teacherAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePostTeacher = () => {
     const navigate = useNavigate();
     const { setGlobalMsg } = useApp();
     const [error, setError] = useState(null);

     const create = useMutation({
          mutationFn: createTeacher,
          onSuccess: () => {
               setError(null)
               setGlobalMsg("Create Teacher Successfully")
          },
          onError: (err) => {

               console.log(err.response?.data);
               const errorMsg = err.response?.data?.message || "Something went wrong";
               setError(errorMsg);
               setGlobalMsg("Error", errorMsg);

               setGlobalMsg("Failed to add user");
          },
     });

     const handleCreate = data => {
          setError(null);
          if(!data){
               setError("All Fields must be required");
          }

          create.mutate(data);
          navigate("/users");
     }

     return ({
          error,
          handleCreate,
          isLoading : create.isPending
     });
}