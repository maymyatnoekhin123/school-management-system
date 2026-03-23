import React, { useState, useRef } from 'react';
import {
     Box, TextField, Button, Typography, Paper,
     Avatar, IconButton, Divider, Alert, CircularProgress
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { usePostTeacher } from '../../hooks/createTeacher';
import { useNavigate } from 'react-router-dom';

const FormRow = ({ label, mmLabel, children }) => (
     <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'center' },
          gap: { xs: 0.5, sm: 2 },
          mb: 3
     }}>
          <Box sx={{ minWidth: { sm: '200px' } }}>
               <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.95rem' }}>
                    {label}
               </Typography>
               <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                    ({mmLabel})
               </Typography>
          </Box>
          <Box sx={{ flex: 1, width: '100%' }}>{children}</Box>
     </Box>
);

export default function AddNewTeacher() {
     const { error, isLoading, handleCreate } = usePostTeacher();
     const [preview, setPreview] = useState(null);
     const [imageFile, setImageFile] = useState(null);
     const navigate = useNavigate();
     const nameInput = useRef();
     const emailInput = useRef();
     const passwordInput = useRef();
     const teacherIdInput = useRef();
     const honorTitleInput = useRef();
     const nrcInput = useRef();
     const dobInput = useRef();
     const qualificationInput = useRef();
     const schoolQualiInput = useRef();
     const otherSkillsInput = useRef();
     const phoneInput = useRef();
     const addressInput = useRef();
     const expYearsInput = useRef();
     const joiningDateInput = useRef();

     // Teacher Age Logic (Must be at least 18 years old)
     const getMaxDOB = () => {
          const d = new Date();
          d.setFullYear(d.getFullYear() - 18);
          return d.toISOString().split('T')[0];
     };
     const maxDobStr = getMaxDOB(); // ၁၈ နှစ်ပြည့်ပြီးသူများသာ ရွေးချယ်နိုင်မည်

     const handleImageChange = e => {
          const file = e.target.files[0];
          if (file) {
               setImageFile(file)
               setPreview(URL.createObjectURL(file));
          }
     };

     const handleSubmit = e => {
          e.preventDefault();
          const formData = new FormData();

          formData.append("name", nameInput.current.value);
          formData.append("email", emailInput.current.value);
          formData.append("password", passwordInput.current.value);
          formData.append("teacher_id", teacherIdInput.current.value);
          formData.append("honor_title", honorTitleInput.current.value);
          formData.append("nrc", nrcInput.current.value);
          formData.append("dob", dobInput.current.value);
          formData.append("qualification", qualificationInput.current.value);
          formData.append("school_qualification", schoolQualiInput.current.value);
          formData.append("other_skills", otherSkillsInput.current.value);
          formData.append("phone", phoneInput.current.value);
          formData.append("address", addressInput.current.value);
          formData.append("experience_years", expYearsInput.current.value);
          formData.append("joining_date", joiningDateInput.current.value);

          if (imageFile) formData.append("image", imageFile);
          handleCreate(formData);
          navigate("/admin/users");
     }

     return (
          <Paper elevation={0} sx={{
               p: { xs: 2, md: 4 }, maxWidth: 850, mx: 'auto', mt: 2,
               borderRadius: '16px', border: '1px solid', borderColor: 'divider',
               bgcolor: (theme) => theme.palette.mode === 'light' ? '#fcfcfc' : 'background.paper'
          }}>
               <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Teacher Registration (ဆရာ/မ စာရင်းသွင်းခြင်း)
               </Typography>

               {isLoading && <Box sx={{ textAlign: 'center', mb: 2 }}><CircularProgress size={24} /></Box>}
               {error && <Alert severity="error" sx={{ mb: 3 }}>Error creating teacher. Please check requirements.</Alert>}

               <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                         <Box sx={{ position: 'relative' }}>
                              <Avatar src={preview} sx={{ width: 110, height: 110, border: '3px solid', borderColor: 'primary.main' }} />
                              <IconButton color="primary" component="label" sx={{ position: 'absolute', bottom: -5, right: -5, bgcolor: 'background.paper', boxShadow: 2 }}>
                                   <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                   <PhotoCamera />
                              </IconButton>
                         </Box>
                    </Box>

                    <Divider sx={{ mb: 4, fontWeight: 600 }}>LOGIN INFORMATION</Divider>

                    <FormRow label="Full Name" mmLabel="အမည်အပြည့်အစုံ">
                         <TextField fullWidth size="small" inputRef={nameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Email Address" mmLabel="အီးမေးလ်">
                         <TextField fullWidth size="small" type="email" inputRef={emailInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Password" mmLabel="လျှို့ဝှက်နံပါတ်">
                         <TextField fullWidth size="small" type="password" inputRef={passwordInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>PERSONAL PROFILE</Divider>

                    <FormRow label="Honor Title" mmLabel="ဘွဲ့ထူး/ဂုဏ်ထူး">
                         <TextField fullWidth size="small" inputRef={honorTitleInput} placeholder="e.g. Maulana, Ustad, Hafiz" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="NRC Number" mmLabel="မှတ်ပုံတင်အမှတ်">
                         <TextField fullWidth size="small" inputRef={nrcInput} required placeholder="12/YAKANA(N)123456" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Date of Birth" mmLabel="မွေးသက္ကရာဇ်">
                         <TextField
                              fullWidth size="small" type="date" inputRef={dobInput}
                              InputLabelProps={{ shrink: true }}
                              slotProps={{ htmlInput: { max: maxDobStr } }} // ၁၈ နှစ်အောက်များ ရွေးမရအောင် ကန့်သတ်ခြင်း
                              required sx={{ bgcolor: 'background.default' }}
                         />
                    </FormRow>

                    <FormRow label="Phone Number" mmLabel="ဖုန်းနံပါတ်">
                         <TextField fullWidth size="small" inputRef={phoneInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Address" mmLabel="နေရပ်လိပ်စာ">
                         <TextField fullWidth size="small" multiline rows={2} inputRef={addressInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>PROFESSIONAL DATA</Divider>

                    <FormRow label="Teacher ID" mmLabel="ဝန်ထမ်းနံပါတ်">
                         <TextField fullWidth size="small" type="number" inputRef={teacherIdInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Joining Date" mmLabel="လုပ်ငန်းစတင်သည့်ရက်စွဲ">
                         <TextField fullWidth size="small" type="date" inputRef={joiningDateInput} InputLabelProps={{ shrink: true }} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Experience Years" mmLabel="လုပ်သက် (နှစ်)">
                         <TextField fullWidth size="small" inputRef={expYearsInput} placeholder="e.g. 3 Years" sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Qualification" mmLabel="ပညာအရည်အချင်း">
                         <TextField fullWidth size="small" inputRef={qualificationInput} required multiline rows={2} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="School Qualification" mmLabel="ကျောင်းမှရရှိသော အရည်အချင်း">
                         <TextField fullWidth size="small" inputRef={schoolQualiInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Other Skills" mmLabel="အခြားကျွမ်းကျင်မှုများ">
                         <TextField fullWidth size="small" inputRef={otherSkillsInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Button
                         type="submit"
                         variant="contained"
                         fullWidth
                         size="large"
                         disabled={isLoading}
                         sx={{ mt: 4, py: 1.5, borderRadius: '10px', fontWeight: 'bold' }}
                    >
                         {isLoading ? 'Creating...' : 'REGISTER TEACHER (ဆရာအဖြစ် စာရင်းသွင်းမည်)'}
                    </Button>
               </form>
          </Paper>
     );
}