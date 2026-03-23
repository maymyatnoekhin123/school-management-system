import React from "react";
import UsersTable from '../../components/UsersTable';
import { useGetUsers } from "../../hooks/getAllusers";
import { Alert, Grid, Container, Typography, CircularProgress,Box,Button } from "@mui/material";

export default function UserManagement() {

     const { isUserLoading, isUserError, userError, users,useDeleteUser } = useGetUsers();

     


     
          if(isUserLoading){return (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
               </Box>
          )
     }
     

     {
          isUserError && (
               <Alert severity="warning">
                    {userError}
               </Alert>
          )
     }

     return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

               <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                    User Management
               </Typography>

               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <UsersTable users={users} deleteFun={useDeleteUser.mutate}/>
               </Grid>
               
          </Container>
          
     )
}