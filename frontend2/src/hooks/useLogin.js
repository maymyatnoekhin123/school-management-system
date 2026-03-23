import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemeApp";
import { loginUser } from "../api/loginAPI";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";


export const useLogin = () => {

     const navigate = useNavigate();
     const { auth, setAuth, setGlobalMsg, authLoading } = useApp();
     const [error, setError] = useState(null);

     const login = useMutation({
          mutationFn: loginUser,
          onSuccess: (res) => {
               setAuth(res.user);
               // console.log(res);
               if (auth.roles.includes("admin") && !authLoading) {
                    navigate("/admin/dashboard");
                    setGlobalMsg("Login Successfully");

               }

               if (auth.roles.includes("student")) {
                    // navigate("/student/dashboard")
                    navigate("/")
               }

               if (auth.roles.includes("teacher")) {
                    // navigate("/teacher/dashboard")
                    navigate("/")

               }
          },

          onError: err => {
               setError(err.message) || "Login failed , please try again later";
          }
     });

     const handleSubmit = (email, password) => {
          setError(null);

          if (!email || !password) {
               setError("Email and Password are required");
               return false;
          }

          login.mutate({ email, password });
     };

     return {
          handleSubmit,
          error,
          isLoading: login.isPending,
     }
}