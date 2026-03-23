import React from 'react';
import {
     Table, TableBody, TableCell, TableContainer,
     TableHead, TableRow, Paper, Typography, Chip, Box, Button, Stack, useTheme
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import {
     Edit as EditIcon,
     Delete as DeleteIcon,
     Class as ClassIcon,
     Group as StudentsIcon,
} from '@mui/icons-material';
import { toUpperCase } from 'zod';

const ClassroomsTable = ({ classrooms }) => {
     const navigate = useNavigate();
     const theme = useTheme();
     const isDark = theme.palette.mode === 'dark';

     // Class configuration for consistent styling
     const classConfig = {
          color: '#2e7d32', // Deep Islamic Green
          bg: isDark ? 'rgba(46, 125, 50, 0.2)' : '#e8f5e9',
          border: isDark ? 'rgba(46, 125, 50, 0.4)' : '#c8e6c9'
     };

     return (
          <Box sx={{ width: '100%', mt: 4, px: { xs: 0.5, sm: 1, md: 0 } }}>
               <TableContainer
                    component={Paper}
                    sx={{
                         background: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                         backdropFilter: 'blur(10px)',
                         borderRadius: { xs: '16px', md: '24px' },
                         border: '1px solid',
                         borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                         boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.03)',
                         overflowX: "auto",
                    }}
               >
                    {/* Header Section */}
                    <Box sx={{
                         p: { xs: 2, md: 4 },
                         display: 'flex',
                         flexDirection: { xs: 'column', sm: 'row' },
                         justifyContent: 'space-between',
                         alignItems: { xs: 'flex-start', sm: 'center' },
                         gap: 2,
                         borderBottom: '1px solid',
                         borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'
                    }}>
                         <Box>
                              <Stack direction="row" spacing={1.5} alignItems="center">
                                   <Box sx={{
                                        p: 1,
                                        borderRadius: '12px',
                                        bgcolor: classConfig.bg,
                                        color: classConfig.color,
                                        display: 'flex'
                                   }}>
                                        <ClassIcon />
                                   </Box>
                                   <Box>
                                        <Typography sx={{
                                             color: isDark ? '#f8fafc' : '#1e293b',
                                             fontWeight: 800,
                                             fontSize: { xs: '1.1rem', md: '1.4rem' },
                                             letterSpacing: '-0.02em'
                                        }}>
                                             Classroom Management (အတန်းများ)
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                             Manage academic levels and enrollments
                                        </Typography>
                                   </Box>
                              </Stack>
                         </Box>
                         <Chip
                              label={`${classrooms?.length || 0} Total Classes`}
                              variant="outlined"
                              sx={{
                                   borderColor: classConfig.border,
                                   color: classConfig.color,
                                   fontWeight: 700,
                                   borderRadius: '8px'
                              }}
                         />
                    </Box>

                    <Table sx={{ minWidth: 600 }}>
                         <TableHead>
                              <TableRow sx={{ bgcolor: isDark ? 'rgba(0,0,0,0.1)' : '#fbfcfd' }}>
                                   {[`ID (အမှတ်စဉ်)`,'CLASS NAME (အတန်းအမည်)', 'TOTAL STUDENTS (ကျောင်းသားဦးရေ)', 'ACTIONS'].map((head) => (
                                        <TableCell key={head} sx={{
                                             color: 'text.secondary',
                                             fontWeight: 700,
                                             fontSize: '0.8rem',
                                             py: 2.5,
                                             letterSpacing: '0.05em'
                                        }}>
                                             {head}
                                        </TableCell>
                                   ))}
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {classrooms?.length > 0 ? (
                                   classrooms.map((room) => (
                                        <TableRow
                                             key={room.id}
                                             sx={{
                                                  '&:last-child td, &:last-child th': { border: 0 },
                                                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#f9fafb' }
                                             }}
                                        >
                                             {/* Class Name Column */}

                                             <TableCell>
                                                  <Typography sx={{
                                                       fontWeight: 700,
                                                       color: isDark ? '#f1f5f9' : '#334155',
                                                       fontSize: { xs: '0.9rem', md: '1rem' }
                                                  }}>
                                                       {room.id}
                                                  </Typography>
                                             </TableCell>

                                             <TableCell>
                                                  <Typography sx={{
                                                       fontWeight: 700,
                                                       color: isDark ? '#f1f5f9' : '#334155',
                                                       fontSize: { xs: '0.9rem', md: '1rem' }
                                                  }}>
                                                       {room.name.toUpperCase()}
                                                  </Typography>
                                             </TableCell>

                                             {/* Total Students Column */}
                                             <TableCell>
                                                  <Stack direction="row" spacing={1} alignItems="center">
                                                       <StudentsIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                                                       <Typography sx={{
                                                            fontWeight: 600,
                                                            color: isDark ? '#94a3b8' : '#64748b'
                                                       }}>
                                                            {room.students_count || room.students?.length || 0}
                                                       </Typography>
                                                       <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled' }}>
                                                            Members
                                                       </Typography>
                                                  </Stack>
                                             </TableCell>

                                             {/* Actions Column */}
                                             <TableCell>
                                                  <Stack direction="row" spacing={1}>
                                                       <Button
                                                            size="small"
                                                            variant="contained"
                                                            disableElevation
                                                            onClick={() => navigate(`/admin/classrooms/edit/${room.id}`)}
                                                            sx={{
                                                                 minWidth: { xs: 35, md: 80 },
                                                                 borderRadius: '8px',
                                                                 bgcolor: isDark ? 'rgba(79, 70, 229, 0.1)' : '#eef2ff',
                                                                 color: '#4f46e5',
                                                                 textTransform: 'none',
                                                                 '&:hover': { bgcolor: '#4f46e5', color: '#fff' }
                                                            }}
                                                       >
                                                            <EditIcon sx={{ fontSize: 18, mr: { xs: 0, md: 1 } }} />
                                                            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Edit</Box>
                                                       </Button>

                                                       <Button
                                                            size="small"
                                                            variant="contained"
                                                            disableElevation
                                                            onClick={() => {}}
                                                            sx={{
                                                                 minWidth: { xs: 35, md: 80 },
                                                                 borderRadius: '8px',
                                                                 bgcolor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
                                                                 color: '#ef4444',
                                                                 textTransform: 'none',
                                                                 '&:hover': { bgcolor: '#ef4444', color: '#fff' }
                                                            }}
                                                       >
                                                            <DeleteIcon sx={{ fontSize: 18, mr: { xs: 0, md: 1 } }} />
                                                            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Delete</Box>
                                                       </Button>
                                                  </Stack>
                                             </TableCell>
                                        </TableRow>
                                   ))
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                                             <Typography color="text.secondary">No classrooms found.</Typography>
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </TableContainer>
          </Box>
     );
};

export default ClassroomsTable;