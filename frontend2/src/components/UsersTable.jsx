import React from 'react';
import { useState } from 'react';
import {
     Table, TableBody, TableCell, TableContainer,
     TableHead, TableRow, Paper, Typography, Chip, Avatar, Box, Button, Stack, useTheme
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemeApp';
import {
     Edit as EditIcon,
     Delete as DeleteIcon,
     AdminPanelSettings as AdminIcon,
     MenuBook as TeacherIcon,
     Person as StudentIcon,
     AccountCircle
} from '@mui/icons-material';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const UsersTable = ({ users, deleteFun }) => {
     const navigate = useNavigate();
     const { auth } = useApp();
     const theme = useTheme();
     const isDark = theme.palette.mode === 'dark';

     const [openModal,setOpenModal] = useState(false);
     const [selectedUser,setSelectedUser] = useState(null);

     const handleDeleteClick = (user) => {
          setSelectedUser(user);
          setOpenModal(true);
     };

     const handleConfirmDelete = () => {
          deleteFun(selectedUser.id);
          setOpenModal(false);
     };

     // Role Config with Islamic Palette
     const getRoleConfig = (roleName) => {
          const role = roleName?.toLowerCase();
          if (role === 'admin') return { color: '#B8860B', icon: <AdminIcon fontSize="inherit" />, bg: isDark ? 'rgba(184, 134, 11, 0.2)' : '#fdf6e3' };
          if (role === 'teacher') return { color: '#2e7d32', icon: <TeacherIcon fontSize="inherit" />, bg: isDark ? 'rgba(46, 125, 50, 0.2)' : '#e8f5e9' };
          if (role === 'student') return { color: '#0288d1', icon: <StudentIcon fontSize="inherit" />, bg: isDark ? 'rgba(2, 136, 209, 0.2)' : '#e1f5fe' };
          return { color: '#64748b', icon: <AccountCircle fontSize="inherit" />, bg: isDark ? 'rgba(100, 116, 139, 0.2)' : '#f1f5f9' };
     };

     return (
          <Box sx={{ width: '100%', mt: 4, px: { xs: 0.5, sm: 1, md: 0 } }}>
               <TableContainer
                    component={Paper}
                    sx={{
                         background: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                         backdropFilter: 'blur(10px)',
                         borderRadius: { xs: '12px', md: '20px' },
                         border: '1px solid',
                         borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : '#e2e8f0',
                         boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.05)',
                         overflowX: "auto",
                    }}
               >
                    {/* Header Section */}
                    <Box sx={{
                         p: { xs: 2, md: 3 },
                         display: 'flex',
                         flexDirection: { xs: 'column', sm: 'row' },
                         justifyContent: 'space-between',
                         alignItems: { xs: 'flex-start', sm: 'center' },
                         gap: 2,
                         borderBottom: '1px solid',
                         borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#f1f5f9'
                    }}>
                         <Box>
                              <Typography sx={{
                                   color: isDark ? '#f8fafc' : '#1e293b',
                                   fontWeight: 800,
                                   fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' }, // Dynamic scaling
                                   lineHeight: 1.2
                              }}>
                                   User Management (အသုံးပြုသူများ)
                              </Typography>
                              <Typography sx={{
                                   color: 'text.secondary',
                                   fontSize: { xs: '0.7rem', md: '0.85rem' }
                              }}>
                                   Academic Records & Roles
                              </Typography>
                         </Box>
                         <Chip
                              label={`${users?.length || 0} Total Members`}
                              sx={{
                                   bgcolor: isDark ? 'rgba(46, 125, 50, 0.3)' : '#e8f5e9',
                                   color: isDark ? '#81c784' : '#2e7d32',
                                   fontWeight: 700,
                                   fontSize: { xs: '0.65rem', md: '0.75rem' }
                              }}
                         />
                    </Box>

                    <Table sx={{ minWidth: 800 }}>
                         <TableHead>
                              <TableRow sx={{ bgcolor: isDark ? 'rgba(0,0,0,0.1)' : '#f8fafc' }}>
                                   {['IDENTITY', 'EMAIL', 'GENDER', 'ROLE', 'ACTIONS'].map((head) => (
                                        <TableCell key={head} sx={{
                                             color: 'text.secondary',
                                             fontWeight: 700,
                                             fontSize: { xs: '0.65rem', md: '0.8rem', lg: '0.9rem' },
                                             py: 2
                                        }}>
                                             {head}
                                        </TableCell>
                                   ))}
                              </TableRow>
                         </TableHead>
                         <TableBody>
                              {users?.length > 0 ? (
                                   users.map((user) => {
                                        const roleName = user.roles?.[0]?.name || "No Role";
                                        const config = getRoleConfig(roleName);

                                        return (
                                             <TableRow key={user.id} sx={{ '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#fafafa' } }}>
                                                  <TableCell>
                                                       <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
                                                            <Avatar
                                                                 onClick={() => user.id !== 1 && navigate(`/profile/${user.id}`)}
                                                                 src={user.photo?.path}
                                                                 sx={{
                                                                      width: { xs: 35, sm: 40, md: 45 },
                                                                      height: { xs: 35, sm: 40, md: 45 },
                                                                      cursor: 'pointer',
                                                                      border: '2px solid',
                                                                      borderColor: config.color,
                                                                      fontSize: { xs: '0.8rem', md: '1rem' }
                                                                 }}
                                                            >
                                                                 {user.name?.charAt(0).toUpperCase()}
                                                            </Avatar>
                                                            <Typography
                                                                 onClick={() => user.id !== 1 && navigate(`/profile/${user.id}`)}
                                                                 sx={{
                                                                      color: isDark ? '#f1f5f9' : '#334155',
                                                                      fontWeight: 600,
                                                                      cursor: 'pointer',
                                                                      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem', lg: '1.1rem' } // Scaling name
                                                                 }}
                                                            >
                                                                 {user.name}
                                                            </Typography>
                                                       </Stack>
                                                  </TableCell>

                                                  <TableCell sx={{
                                                       color: 'text.secondary',
                                                       fontSize: { xs: '0.75rem', md: '0.9rem' }
                                                  }}>
                                                       {user.email}
                                                  </TableCell>

                                                  <TableCell sx={{
                                                       color: 'text.secondary',
                                                       fontSize: { xs: '0.75rem', md: '0.9rem' },
                                                       textTransform: 'capitalize'
                                                  }}>
                                                       {user?.student?.gender || user?.teacher?.gender || user?.gender || "-"}
                                                  </TableCell>

                                                  <TableCell>
                                                       <Chip
                                                            icon={config.icon}
                                                            label={roleName}
                                                            sx={{
                                                                 bgcolor: config.bg,
                                                                 color: config.color,
                                                                 fontWeight: 700,
                                                                 fontSize: { xs: '0.6rem', md: '0.7rem' },
                                                                 height: { xs: 24, md: 28 }
                                                            }}
                                                       />
                                                  </TableCell>

                                                  <TableCell align="right">
                                                       {auth && user.id !== auth.id && (
                                                            <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                                                                 <Button
                                                                      onClick={() => roleName.toLowerCase() === "student" ? navigate(`/admin/students/edit/${user.id}`) : navigate(`/admin/teachers/edit/${user.id}`)}
                                                                      sx={{ minWidth: { xs: 30, md: 40 }, color: isDark ? '#818cf8' : '#4f46e5' }}
                                                                 >
                                                                      <EditIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                                                 </Button>
                                                                 <Button
                                                                      onClick={() => handleDeleteClick(user)}
                                                                      sx={{ minWidth: { xs: 30, md: 40 }, color: '#ef4444' }}
                                                                 >
                                                                      <DeleteIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
                                                                 </Button>
                                                            </Stack>
                                                       )}
                                                  </TableCell>
                                             </TableRow>
                                        );
                                   })
                              ) : (
                                   <TableRow>
                                        <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                                             No records found.
                                        </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </TableContainer>
               <ConfirmDeleteModal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    onConfirm={handleConfirmDelete}
                    itemName={selectedUser?.name}
               />
          </Box>
     );
};

export default UsersTable;