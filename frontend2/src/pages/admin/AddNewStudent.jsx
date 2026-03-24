import { useCreateStudent } from "../../hooks/createStudent";
import { useClassrooms } from "../../hooks/classrooms";
import {
     Box, Typography, Alert, TextField, Button, CircularProgress,
     MenuItem, Divider, FormControl, InputLabel, Select, Avatar, IconButton, Paper,
     Checkbox, ListItemText, OutlinedInput, Chip
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function AddNewStudent() {
     const { handleCreate, isLoading } = useCreateStudent();
     const { classrooms } = useClassrooms();
     const [error, setError] = useState(null);
     const navigate = useNavigate();
     const [preview, setPreview] = useState(null);
     const [imageFile, setImageFile] = useState(null);
     const [selectedClassrooms, setSelectedClassrooms] = useState([]);

     // REFS
     const studentIdInput = useRef();
     const nameInput = useRef();
     const arabNameInput = useRef();
     const emailInput = useRef(); // REQUIRED BY LARAVEL REQUEST
     const passwordInput = useRef(); // REQUIRED BY LARAVEL REQUEST
     const dobInput = useRef();
     const genderInput = useRef();
     const fatherNameInput = useRef();
     const fatherArabNameInput = useRef();
     const motherNameInput = useRef();
     const motherArabNameInput = useRef();
     const relationshipInput = useRef();
     const addressInput = useRef();
     const phoneInput = useRef();
     const isNewInput = useRef();
     const currentEduInput = useRef();
     const previousSchoolInput = useRef();
     const previousClassInput = useRef();

     const handleImageChange = e => {
          const file = e.target.files[0];
          if (file) {
               setImageFile(file);
               setPreview(URL.createObjectURL(file));
          }
     };

     const handleClassroomChange = (event) => {
          const { target: { value } } = event;
          setSelectedClassrooms(typeof value === 'string' ? value.split(',') : value);
     };

     const handleSubmit = (e) => {
          e.preventDefault();
          if (selectedClassrooms.length === 0) {
               setError("Please select at least one classroom");
               return;
          }

          const formData = new FormData();
          // Required by Laravel Request
          formData.append("student_id", studentIdInput.current.value);
          formData.append("name", nameInput.current.value);
          formData.append("arabic_name", arabNameInput.current.value || "");
          formData.append("email", emailInput.current.value);
          formData.append("password", passwordInput.current.value);
          formData.append("dob", dobInput.current.value);
          formData.append("gender", genderInput.current.value);
          formData.append("father_name", fatherNameInput.current.value);
          formData.append("father_arabic_name", fatherArabNameInput.current.value || "");
          formData.append("mother_name", motherNameInput.current.value);
          formData.append("mother_arabic_name", motherArabNameInput.current.value || "");
          formData.append("relationship", relationshipInput.current.value || "");
          formData.append("address", addressInput.current.value);
          formData.append("phone", phoneInput.current.value);
          formData.append("isNew", isNewInput.current.value || "yes");
          formData.append("current_education", currentEduInput.current.value);

          // These were in schema but missing from your previous formData.append list
          formData.append("previous_school", previousSchoolInput.current.value || "");
          formData.append("previous_class", previousClassInput.current.value || "");

          selectedClassrooms.forEach(id => formData.append("classroom_ids[]", id));
          if (imageFile) formData.append("image", imageFile);

          handleCreate(formData);
          navigate("/admin/users");
     }

     return (
          <Paper elevation={0} sx={{
               maxWidth: 850, mx: 'auto', p: { xs: 2, md: 4 }, mt: 2,
               borderRadius: '16px', border: '1px solid', borderColor: 'divider',
          }}>
               <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center', color: 'primary.main' }}>
                    Student Registration
               </Typography>

               {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

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

                    <Divider sx={{ mb: 4, fontWeight: 600 }}>LOGIN ACCOUNT</Divider>

                    <FormRow label="Email Address" mmLabel="အီးမေးလ်">
                         <TextField fullWidth size="small" type="email" inputRef={emailInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Password" mmLabel="လျှို့ဝှက်နံပါတ်">
                         <TextField fullWidth size="small" type="password" inputRef={passwordInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>STUDENT INFO</Divider>

                    <FormRow label="Student ID" mmLabel="ကျောင်းသားနံပါတ်">
                         <TextField fullWidth size="small" type="number" inputRef={studentIdInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Full Name" mmLabel="အမည်အပြည့်အစုံ">
                         <TextField fullWidth size="small" inputRef={nameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Arabic Name" mmLabel="အာရဗီနာမည်">
                         <TextField fullWidth size="small" inputRef={arabNameInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Date of Birth" mmLabel="မွေးသက္ကရာဇ်">
                         <TextField fullWidth size="small" type="date" inputRef={dobInput} InputLabelProps={{ shrink: true }} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Gender" mmLabel="ကျား/မ">
                         <Select fullWidth size="small" inputRef={genderInput} defaultValue="male">
                              <MenuItem value="male">Male</MenuItem>
                              <MenuItem value="female">Female</MenuItem>
                         </Select>
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>EDUCATION</Divider>

                    <FormRow label="Select Classrooms" mmLabel="အတန်းများ">
                         <FormControl fullWidth size="small">
                              <InputLabel>Choose Classes</InputLabel>
                              <Select
                                   multiple value={selectedClassrooms} onChange={handleClassroomChange}
                                   input={<OutlinedInput label="Choose Classes" />}
                                   renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                             {selected.map((val) => <Chip key={val} label={classrooms?.find(c => c.id === val)?.name} size="small" />)}
                                        </Box>
                                   )}
                              >
                                   {classrooms?.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                             <Checkbox checked={selectedClassrooms.indexOf(c.id) > -1} />
                                             <ListItemText primary={c.name} />
                                        </MenuItem>
                                   ))}
                              </Select>
                         </FormControl>
                    </FormRow>

                    <FormRow label="Current Education" mmLabel="လက်ရှိပညာအရည်အချင်း">
                         <TextField fullWidth size="small" inputRef={currentEduInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Previous School" mmLabel="ယခင်ကျောင်းအမည်">
                         <TextField fullWidth size="small" inputRef={previousSchoolInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Previous Class" mmLabel="ယခင်အတန်း">
                         <TextField fullWidth size="small" inputRef={previousClassInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Admission Type" mmLabel="ကျောင်းသားသစ်/ဟောင်း">
                         <Select fullWidth size="small" inputRef={isNewInput} defaultValue="yes">
                              <MenuItem value="yes">New Student</MenuItem>
                              <MenuItem value="no">Old Student</MenuItem>
                         </Select>
                    </FormRow>

                    <Divider sx={{ my: 4, fontWeight: 600 }}>FAMILY & ADDRESS</Divider>

                    <FormRow label="Father Name" mmLabel="ဖခင်အမည်">
                         <TextField fullWidth size="small" inputRef={fatherNameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Father Arabic Name" mmLabel="ဖခင်အာရဗီအမည်">
                         <TextField fullWidth size="small" inputRef={fatherArabNameInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Mother Name" mmLabel="မိခင်အမည်">
                         <TextField fullWidth size="small" inputRef={motherNameInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Mother Arabic Name" mmLabel="မိခင်အာရဗီအမည်">
                         <TextField fullWidth size="small" inputRef={motherArabNameInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Relationship" mmLabel="တော်စပ်ပုံ">
                         <TextField fullWidth size="small" inputRef={relationshipInput} sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Phone Number" mmLabel="ဖုန်းနံပါတ်">
                         <TextField fullWidth size="small" inputRef={phoneInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <FormRow label="Home Address" mmLabel="နေရပ်လိပ်စာ">
                         <TextField fullWidth size="small" multiline rows={2} inputRef={addressInput} required sx={{ bgcolor: 'background.default' }} />
                    </FormRow>

                    <Button
                         type="submit" variant="contained" fullWidth size="large"
                         disabled={isLoading} sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                    >
                         {isLoading ? <CircularProgress size={24} color="inherit" /> : 'REGISTER STUDENT'}
                    </Button>
               </form>
          </Paper>
     )
}