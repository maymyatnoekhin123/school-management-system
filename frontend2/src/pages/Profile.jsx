import { useParams } from "react-router-dom";
import { useGetUserProfile } from "../hooks/getAllusers";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import StudentProfile from "../components/StudentProfile";
import TeacherProfile from "../components/TeacherProfile";

export default function Profile() {
     const { id } = useParams();
     console.log(id);

     const { isPLoading, isPerror, pError, user } = useGetUserProfile(id);

     

     if (isPLoading) {
          return (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
               </Box>
          );
     }

     if(isPerror){
          return(
               <Alert severity="warning">
                    {pError.message ? pError.message : ""}
               </Alert>
          )
     }
     
     
          if(user?.roles?.includes("student")){
               return (
                    <StudentProfile user={user}/>
               )
          }

          if(user?.roles.includes("teacher")){

               return (
                    <TeacherProfile user={user}/>
               )
          }
     
}