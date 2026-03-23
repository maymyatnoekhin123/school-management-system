import React, { useState } from 'react';
import { createContext,useContext } from 'react';
import {
     Box,
     Button,
     TextField,
     InputAdornment,
     IconButton,
     Typography,
     Checkbox,
     FormControlLabel,
     Paper,
     Divider,
     Link,
     Container
} from '@mui/material';
import {
     Mail,
     Lock,
     Eye,
     EyeOff,
     LogIn,
     GraduationCap
} from 'lucide-react';

/**
 * A professional standalone Login Form component.
 * Designed for use on a dedicated authentication page.
 */
const LoginForm = () => {
     const [showPassword, setShowPassword] = useState(false);
     const [formData, setFormData] = useState({
          email: '',
          password: '',
     });

     const emailInput = createContext();
     const passwordInput = createContext();

     const handleTogglePassword = () => setShowPassword(!showPassword);

     const handleChange = (e) => {
          const { name, value, type } = e.target;
          setFormData((prev) => ({
               ...prev,
               [name]: type === 'checkbox' ? checked : value
          }));
     };

     const handleSubmit = (e) => {
          e.preventDefault();



     };

     return (
          <Container maxWidth="sm" sx={{ py: 8 }}>
               <Paper
                    elevation={0}
                    sx={{
                         p: { xs: 3, md: 6 },
                         borderRadius: '24px',
                         border: '1px solid #e2e8f0',
                         boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                    }}
               >
                    {/* Branding/Header */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                         <Box
                              sx={{
                                   display: 'inline-flex',
                                   p: 1.5,
                                   borderRadius: '16px',
                                   backgroundColor: '#4f46e5',
                                   color: 'white',
                                   mb: 2
                              }}
                         >
                              <GraduationCap size={32} />
                         </Box>
                         <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                              Welcome Back
                         </Typography>
                         <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                              Please enter your details to sign in to your account
                         </Typography>
                    </Box>

                    <form onSubmit={handleSubmit}>
                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                              {/* Email Field */}
                              <Box>
                                   <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 1, display: 'block' }}>
                                        Email Address
                                   </Typography>
                                   <TextField
                                        fullWidth
                                        name="email"
                                        placeholder="name@university.edu"
                                        variant="outlined"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                             startAdornment: (
                                                  <InputAdornment position="start">
                                                       <Mail size={18} className="text-slate-400" />
                                                  </InputAdornment>
                                             ),
                                             sx: { borderRadius: '12px', backgroundColor: '#f8fafc' }
                                        }}
                                   />
                              </Box>

                              {/* Password Field */}
                              <Box>
                                   <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', mb: 1, display: 'block' }}>
                                        Password
                                   </Typography>
                                   <TextField
                                        fullWidth
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        variant="outlined"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                             startAdornment: (
                                                  <InputAdornment position="start">
                                                       <Lock size={18} className="text-slate-400" />
                                                  </InputAdornment>
                                             ),
                                             endAdornment: (
                                                  <InputAdornment position="end">
                                                       <IconButton onClick={handleTogglePassword} edge="end" size="small">
                                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                       </IconButton>
                                                  </InputAdornment>
                                             ),
                                             sx: { borderRadius: '12px', backgroundColor: '#f8fafc' }
                                        }}
                                   />
                              </Box>

                              

                              {/* Submit Button */}
                              <Button
                                   fullWidth
                                   type="submit"
                                   variant="contained"
                                   size="large"
                                   startIcon={<LogIn size={20} />}
                                   sx={{
                                        py: 1.5,
                                        borderRadius: '12px',
                                        backgroundColor: '#4f46e5',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
                                        '&:hover': {
                                             backgroundColor: '#4338ca',
                                             boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)'
                                        }
                                   }}
                              >
                                   Sign In
                              </Button>

                              <Box sx={{ mt: 2, textAlign: 'center' }}>
                                   <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                                        Don't have an account?{' '}
                                        <Link href="#" sx={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'none' }}>
                                             Sign up for free
                                        </Link>
                                   </Typography>
                              </Box>
                         </Box>
                    </form>
               </Paper>
          </Container>
     );
};

export default LoginForm;