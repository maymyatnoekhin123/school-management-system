import ClassroomsTable from "../../components/Classrooms";
import { useClassrooms } from "../../hooks/classrooms";
import { Alert, Grid, Container, Typography, CircularProgress, Box, Button } from "@mui/material";

export default function Classroom(){

     const {isCLoading,cError,isCError,classrooms} = useClassrooms();

     {isCLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                              <CircularProgress />
                              <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
                         </Box>
     )}

     {isCError && (
          <Alert severity="danger">
               {cError.message}
          </Alert>
     )}

     return(
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

               <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                    Class-Rooms
               </Typography>

               <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <ClassroomsTable classrooms={classrooms}  />
               </Grid>

          </Container>
     )
}