import { Box, Container, Grid, Paper, Avatar, Typography, Stack, Chip, Divider } from "@mui/material";
import {
     WorkspacePremium as WorkspacePremiumIcon,
     Email as EmailIcon,
     VerifiedUser as VerifiedIcon,
     Call as CallIcon,
     Home as HomeIcon,
     AssignmentInd as IdIcon
} from "@mui/icons-material";


export default function TeacherProfile({ user }) {
     // const theme = useTheme();
     // const isDark = theme.palette.mode === 'dark';

     return (
          <Box sx={{ minHeight: '100vh', bgcolor: "dark" ? '#0f172a' : '#f1f5f9', py: { xs: 4, md: 8 } }}>
               <Container maxWidth="md">
                    <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '30px', border: '1px solid', borderColor: 'divider' }}>
                         <Stack alignItems="center" spacing={2} sx={{ mb: 4 }}>
                              <Avatar src={user?.photo} sx={{ width: 140, height: 140, border: '5px solid #2e7d32' }} />
                              <Box sx={{ textAlign: 'center' }}>
                                   <Typography variant="h4" sx={{ fontWeight: 900, color: '#2e7d32' }}>
                                        {user?.honor_title} {user?.name}
                                   </Typography>
                                   <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                                        Official Faculty Member (ဆရာမ/ဆရာ)
                                   </Typography>
                              </Box>
                              <Chip icon={<VerifiedIcon />} label="Verified Educator" color="success" variant="outlined" />
                         </Stack>

                         <Divider sx={{ mb: 4 }} />

                         <Grid container spacing={4}>
                              <Grid item xs={12} sm={6}>
                                   <Typography variant="overline" sx={{ fontWeight: 800, color: '#2e7d32' }}>Professional Identity</Typography>
                                   <Stack spacing={2} sx={{ mt: 2 }}>
                                        <InfoItem icon={<IdIcon />} label="Teacher ID" val={user?.teacher_id} />
                                        <InfoItem icon={<WorkspacePremiumIcon />} label="Highest Qualification" val={user?.qualification} />
                                        <InfoItem icon={<WorkspacePremiumIcon />} label="School Qualification" val={user?.school_qualification} />
                                   </Stack>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                   <Typography variant="overline" sx={{ fontWeight: 800, color: '#2e7d32' }}>Contact Information</Typography>
                                   <Stack spacing={2} sx={{ mt: 2 }}>
                                        <InfoItem icon={<EmailIcon />} label="Official Email" val={user?.email} />
                                        <InfoItem icon={<CallIcon />} label="Phone Number" val={user?.phone} />
                                        <InfoItem icon={<HomeIcon />} label="Home Address" val={user?.address} />
                                   </Stack>
                              </Grid>

                              <Grid item xs={12}>
                                   <Box sx={{ p: 3, bgcolor: '#e8f5e9', borderRadius: '15px', borderLeft: '6px solid #2e7d32' }}>
                                        <Typography variant="subtitle2" sx={{ color: '#1b5e20', fontWeight: 800 }}>Biography & Skills</Typography>
                                        <Typography variant="body2" sx={{ mt: 1, color: '#2e7d32' }}>
                                             <b>Other Skills:</b> {user?.other_skills || "Not specified"}<br />
                                             <b>Experience:</b> {user?.experience_years} years of teaching experience.
                                        </Typography>
                                   </Box>
                              </Grid>
                         </Grid>
                    </Paper>
               </Container>
          </Box>
     );
}

const InfoItem = ({ icon, label, val }) => (
     <Stack direction="row" spacing={2}>
          <Box sx={{ color: '#2e7d32', mt: 0.5 }}>{icon}</Box>
          <Box>
               <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>{label}</Typography>
               <Typography variant="body1" sx={{ fontWeight: 600 }}>{val || "-"}</Typography>
          </Box>
     </Stack>
);