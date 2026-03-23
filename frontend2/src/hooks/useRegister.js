import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemeApp";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/loginAPI";

export const useRegister = () => {

     const navigate = useNavigate();
     const {setGlobalMsg} = useApp();
     const [error,setError] = useState(null);

     const register = useMutation({
          mutationFn : registerUser,
          onSuccess :() => {
                setGlobalMsg("Register Step 1 Successfully");
               navigate("/login"); 
          },

          onError : err => {

          //     const error = err.errorMsg || err.message || "Registration failed";
          //     setError(error);
               // setGlobalMsg(error); 
          }
     });

     const handleSubmit = (name,email,password) => {

          setError(null);
          if(!name || !email || !password) {

               
               setGlobalMsg("Required input all fields");
               return false;
          }

          register.mutate({name,email,password});
     }

     return({
          handleSubmit,
          error,
          isLoading : register.isPending
     })

}