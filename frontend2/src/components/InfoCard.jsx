import React from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';

const InfoCard = ({ title, count, icon, color }) => {
     return (
          <Card sx={{ minWidth: 200, borderRadius: 4, boxShadow: 2, position: 'relative', overflow: 'hidden',mx:2 }}>
               <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Box>
                              <Typography color="text.secondary" variant="subtitle2" fontWeight="bold" gutterBottom>
                                   {title.toUpperCase()}
                              </Typography>
                              <Typography variant="h4" fontWeight="bold">
                                   {count}
                              </Typography>
                         </Box>

                         <Paper
                              elevation={0}
                              sx={{
                                   bgcolor: `${color}.light`,
                                   color: `${color}.main`,
                                   p: 1.5,
                                   borderRadius: 3,
                                   display: 'flex',
                                   alignItems: 'center',
                                   justifyContent: 'center'
                              }}
                         >
                              {icon}
                         </Paper>
                    </Box>
               </CardContent>

               <Box sx={{ height: 4, bgcolor: `${color}.main` }} />
          </Card>
     );
};

export default InfoCard;