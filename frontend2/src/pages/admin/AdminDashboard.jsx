import React from 'react';
import { Grid, Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import InfoCard from '../../components/InfoCard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

import { useStudentCount } from '../../hooks/studentCount';
import { useTeacherCount } from '../../hooks/teacherCount';
import { useCurrentYear } from '../../hooks/currentYear';

export default function AdminDashBoard() {
     
     const {isTLoading,isTError,tError,teacherCount} = useTeacherCount();
     const {isSLoading,isSError,sError,studentCount} = useStudentCount();
     const {isCYLoading,isCYError,cyError,currentYear} = useCurrentYear();
     
     {
          (isSLoading || isTLoading || isCYLoading) && (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>Loading Dashboard Data...</Typography>
               </Box>
          );
}

     {
          isSError  && (
               <Alert severity='warning'>{sError}</Alert>
          )
     }

     {
          isTError && (
               <Alert severity='warning'>{tError}</Alert>
          )
     }

     {
          isCYError && (
               <Alert severity='warning'>{cyError}</Alert>
          )
     }

     return (
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
               <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                    Admin Dashboard
               </Typography>

               {/* <Grid container spacing={3} sx={{ mb: 4 }}> */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                         <InfoCard
                              title="Total Students"
                              count={studentCount}
                              icon={<PeopleIcon fontSize="large" />}
                              color="primary"
                         />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{my : 2}}>
                         <InfoCard
                              title="Total Teachers"
                              count={teacherCount || 0}
                              icon={<SchoolIcon fontSize="large" />}
                              color="secondary"
                         />
                    </Grid>

               <Grid size={{ xs: 12, sm: 6, md: 4 }} sx={{ my: 2 }}>
                    <InfoCard
                         title="Current Year"
                         count={currentYear || null}
                         icon={<SchoolIcon fontSize="large" />}
                         color="secondary"
                    />
               </Grid>
               {/* </Grid> */}

               
          </Container>
     );
}