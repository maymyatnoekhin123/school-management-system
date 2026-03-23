import { Grid, Chip, Divider, Paper, Stack, Avatar, Box, Typography, Container, Button, useTheme } from "@mui/material";
import {
     CalendarMonth as CalendarMonthIcon,
     Person as PersonIcon,
     LocationOn as LocationOnIcon,
     Email as EmailIcon,
     Verified as VerifiedIcon,
     LocalPhone as PhoneIcon,
     School as SchoolIcon
} from "@mui/icons-material";

export default function StudentProfile({ user }) {
     const theme = useTheme();
     const isDark = theme.palette.mode === 'dark';

     return (
          <Box sx={{
               minHeight: '100vh',
               bgcolor: isDark ? '#020617' : '#f8fafc',
               pt: { xs: 2, md: 6 },
               pb: 8
          }}>
               <Container maxWidth="lg">
                    <Grid container spacing={3}>
                         {/* Profile Header Card */}
                         <Grid item xs={12}>
                              <Paper elevation={0} sx={{
                                   p: { xs: 3, md: 5 },
                                   borderRadius: '24px',
                                   background: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                                   border: '1px solid',
                                   borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0',
                                   display: 'flex',
                                   flexDirection: { xs: 'column', md: 'row' },
                                   alignItems: 'center',
                                   gap: 4
                              }}>
                                   <Box sx={{ position: 'relative' }}>
                                        <Avatar
                                             src={user?.photo}
                                             sx={{
                                                  width: { xs: 120, md: 160 },
                                                  height: { xs: 120, md: 160 },
                                                  border: '4px solid #10b981'
                                             }}
                                        />
                                        <VerifiedIcon sx={{ position: 'absolute', bottom: 10, right: 10, color: '#10b981', bgcolor: '#fff', borderRadius: '50%' }} />
                                   </Box>

                                   <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
                                        <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#1e293b' }}>
                                             {user?.name}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', fontWeight: 600, mb: 2 }}>
                                             ID: {user?.student_id || "N/A"}
                                        </Typography>
                                        <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                                             <Chip icon={<SchoolIcon fontSize="small" />} label="Student (ကျောင်းသား)" color="primary" sx={{ fontWeight: 700 }} />
                                             <Chip label={user?.gender} variant="outlined" />
                                        </Stack>
                                   </Box>
                              </Paper>
                         </Grid>

                         {/* Details Column */}
                         <Grid item xs={12} md={5}>
                              <Paper sx={{ p: 3, borderRadius: '20px', bgcolor: isDark ? 'rgba(30, 41, 59, 0.3)' : '#fff' }}>
                                   <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Personal Info</Typography>
                                   <Stack spacing={2.5}>
                                        <InfoRow icon={<CalendarMonthIcon color="primary" />} label="Date of Birth" val={user?.dob} />
                                        <InfoRow icon={<EmailIcon color="primary" />} label="Email Address" val={user?.email} />
                                        <InfoRow icon={<PhoneIcon color="primary" />} label="Contact Number" val={user?.phone} />
                                        <InfoRow icon={<LocationOnIcon color="primary" />} label="Address" val={user?.address} />
                                   </Stack>
                              </Paper>
                         </Grid>

                         <Grid item xs={12} md={7}>
                              <Paper sx={{ p: 3, borderRadius: '20px', bgcolor: isDark ? 'rgba(30, 41, 59, 0.3)' : '#fff' }}>
                                   <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Family & Education</Typography>
                                   <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                             <DataBox label="Father's Name" val={user?.father_name} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                             <DataBox label="Mother's Name" val={user?.mother_name} />
                                        </Grid>
                                        <Grid item xs={12}>
                                             <Divider sx={{ my: 1 }} />
                                        </Grid>
                                        <Grid item xs={12}>
                                             <DataBox label="Current Education" val={user?.current_education} />
                                        </Grid>
                                        <Grid item xs={12}>
                                             <DataBox label="Reason for Joining" val={user?.reason_of_join} />
                                        </Grid>
                                   </Grid>
                              </Paper>
                         </Grid>
                    </Grid>
               </Container>
          </Box>
     );
}

// Helper Components
const InfoRow = ({ icon, label, val }) => (
     <Stack direction="row" spacing={2} alignItems="center">
          <Box sx={{ p: 1, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>{icon}</Box>
          <Box>
               <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{label}</Typography>
               <Typography variant="body1" sx={{ fontWeight: 600 }}>{val || "-"}</Typography>
          </Box>
     </Stack>
);

const DataBox = ({ label, val }) => (
     <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: '12px' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>{label}</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>{val || "-"}</Typography>
     </Box>
);