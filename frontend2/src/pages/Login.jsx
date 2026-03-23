import { Alert, Box, Button, InputAdornment, TextField, Typography, Container, Paper, Avatar } from "@mui/material";

import {
     School as SchoolIcon,
     MailOutline as MailOutlineIcon,
     LockOutline as LockOutlinedIcon,
     ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";



import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
// import { useNavigate } from "react-router-dom";
// import { useApp } from "../ThemeApp";

export default function Login() {

     // const navigate = useNavigate();
     const emailInput = useRef();
     const passwordInput = useRef();
     // const {authLoading}  = useApp()
     const { handleSubmit, error, isLoading } = useLogin();
     // const { auth } = useApp();

     const formSubmit = e => {

          e.preventDefault();
          handleSubmit(emailInput.current.value, passwordInput.current.value);
     }

     {
          isLoading &&  (
               <Typography textAlign={"center"}>Loading ...</Typography>
          )
     }

     {
          error && (
               <Alert severity="warning" sx={{ mt: 2 }}>All Fields are required
               </Alert>
          )
     }

     // {auth && (
     //      navigate("/admin/dashboard")
     // )}


     return (
          <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
               <Paper sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                         <Avatar sx={{ bgcolor: '#3c4776', width: 120, height: 120, mx: 'auto', mb: 2, boxShadow: 3 , padding:2}} src="/logo.png"
                         imgProps={{
                              style :{
                                   objectFit : "contain"
                              }
                         }}>
  
                         </Avatar>
                         <Typography variant="h5" gutterBottom>Login</Typography>
                         <Typography variant="body2" color="text.secondary">Enter your credentials to continue</Typography>
                    </Box>

                    {isLoading && (
                         <Typography textAlign="center" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                              Loading ...
                         </Typography>
                    )}

                    {error && (
                         <Alert severity="warning" sx={{ mb: 2, textAlign: 'left' }}>
                              All Fields are required
                         </Alert>
                    )}

                    <form onSubmit={formSubmit}>
                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              <TextField
                                   fullWidth
                                   label="Email"
                                   placeholder="name@edu.com"
                                   inputRef={emailInput}
                                   InputProps={{
                                        startAdornment: (
                                             <InputAdornment position="start">
                                                  <MailOutlineIcon fontSize="small" color="action" />
                                             </InputAdornment>
                                        ),
                                   }}
                              />
                              <TextField
                                   fullWidth
                                   type="password"
                                   label="Password"
                                   inputRef={passwordInput}
                                   InputProps={{
                                        startAdornment: (
                                             <InputAdornment position="start">
                                                  <LockOutlinedIcon fontSize="small" color="action" />
                                             </InputAdornment>
                                        ),
                                   }}
                              />
                              <Button
                                   type="submit"
                                   variant="contained"
                                   size="large"
                                   fullWidth
                                   disabled={isLoading}
                                   endIcon={!isLoading && <ArrowForwardIcon />}
                              >
                                   Login
                              </Button>
                         </Box>
                    </form>
               </Paper>
          </Container>
     );

}