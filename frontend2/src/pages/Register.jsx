import { Alert, InputAdornment, Box, Button, TextField, Typography, Container, Paper, Avatar } from "@mui/material";

import {
     School as SchoolIcon,
     MailOutline as MailOutlineIcon,
     LockOutline as LockOutlinedIcon,
     ArrowForward as ArrowForwardIcon,
     Abc as AbcIcon

} from "@mui/icons-material"
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemeApp";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
     const navigate = useNavigate();
     const { error, isLoading, handleSubmit } = useRegister();
     const { auth } = useApp();
     const emailInput = useRef();
     const nameInput = useRef();
     const passwordInput = useRef();

     const formSubmit = (e) => {
          e.preventDefault();
          handleSubmit(nameInput.current.value, emailInput.current.value, passwordInput.current.value);
     }

     {
          isLoading && (
               <Typography textAlign={"center"}>Loading ...</Typography>
          )
     }

     {
          error && (
               <Alert severity="warning">{error}</Alert>
          )
     }
     {
          auth && (
               <></>
          )
     }

     return (
          <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
               <Paper sx={{ p: 4, width: '100%', textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                         <Avatar sx={{ bgcolor: 'primary.main', width: 120, height: 120, mx: 'auto', mb: 2, boxShadow: 3,padding : 2 }} src="/logo.png">
  
                         </Avatar>
                         <Typography variant="h5" gutterBottom>Register</Typography>
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
                                   label="Name"
                                   placeholder="Your Name"
                                   inputRef={nameInput}
                                   InputProps={{
                                        startAdornment: (
                                             <InputAdornment position="start">
                                                  <AbcIcon fontSize="small" color="action" />
                                             </InputAdornment>
                                        ),
                                   }}
                              />

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
                                   Register
                              </Button>
                         </Box>
                    </form>
               </Paper>
          </Container>
     );

}