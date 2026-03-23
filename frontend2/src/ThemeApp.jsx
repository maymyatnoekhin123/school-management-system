import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import {   grey,blue  } from "@mui/material/colors";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Template from "./Template";
import Login from "./pages/Login";
import Dashboard from "./components/Dashboard";
import { fetchVerify } from "./api/loginAPI";
import { RoleGuard } from "./RoleGuard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Register from "./pages/Register";
import UserManagement from "./pages/admin/UserManagement";
import AddNewStudent from "./pages/admin/AddNewStudent";
import Profile from "./pages/Profile";
import UpdateStudent from "./pages/students/UpdateStudent";
import UpdateTeacher from "./pages/teachers/UpdateTeacher";
import AddNewTeacher from "./pages/admin/AddNewTeacher";
import Classroom from "./pages/admin/Classrooms";

const AppContext = createContext();

export function useApp() {
     return useContext(AppContext);
}

export const queryClient = new QueryClient();

const router = createBrowserRouter([
     {
          path: "/",
          element: <Template />,
          children: [
               { path: "login", element: <Login /> },
               { path: "register", element: <Register /> },
               {path : "profile/:id",element : <Profile /> },

               {
                    element: <RoleGuard allowedRoles={["admin"]} />,
                    children: [
                         { path: "admin/dashboard", element: <AdminDashboard /> },
                         {path: "admin/users",element : <UserManagement/>},
                         {path : "admin/students/register", element : <AddNewStudent/>},
                         { path: "/admin/teachers/register",element : <AddNewTeacher/>},
                         {path : "admin/students/edit/:id",element : <UpdateStudent/>},
                         { path: "admin/teachers/edit/:id", element: <UpdateTeacher /> },

                         { path: "admin/classrooms", element: <Classroom/> },
                    ],
               },

               {
                    element: <RoleGuard allowedRoles={["admin", "student"]} />,
                    children: [
                         { path: "students/dashboard", element: <Dashboard /> },
                         // { path: "students/profile", element: <Profile /> },
                    ]
               }
          ]
     }
])

export default function ThemedApp() {

     const [mode, setMode] = useState("light");
     const [auth, setAuth] = useState(null);
     const [showDrawer, setShowDrawer] = useState(false);
     const [globalMsg, setGlobalMsg] = useState(null);
     const [authLoading,setAuthLoading] = useState(true);

     const theme = useMemo(() => {
          return createTheme({
               palette: {
                    mode,
                    primary:{
                         main: "#3c4776",
                    },
                    banner: mode === "dark" ? grey[800] : grey[200],
                    text: {
                         fade: grey[500],
                    },
               },
               components: {
                    MuiContainer: {
                         styleOverrides: {
                              root: {
                                   paddingLeft: '16px',
                                   paddingRight: '16px',
                                   '@media (min-width: 600px)': {
                                        paddingLeft: '24px',
                                        paddingRight: '24px',
                                   },
                              },
                         },
                    },
                    MuiPaper: {
                         styleOverrides: {
                              root: {
                                   
                                   maxWidth: '100%',
                                   overflowX: 'hidden',
                              },
                         },
                    },
               },
          });
     }, [mode]);

     useEffect(() => {
          fetchVerify().then(user => {
               if (user) setAuth(user);
          }).catch(res => {
               return false;
          }).finally(() => {
               setAuthLoading(false);
          });
     }, []);


     return (
          <QueryClientProvider client={queryClient}>

               <ThemeProvider theme={theme}>
                    <AppContext.Provider value={{ mode, setMode, auth, setAuth, showDrawer, setShowDrawer, globalMsg, setGlobalMsg,authLoading,setAuthLoading }}>
                         <RouterProvider router={router} />
                         <CssBaseline />
                    </AppContext.Provider>
               </ThemeProvider>
          </QueryClientProvider>

     );
}